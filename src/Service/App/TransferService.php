<?php

namespace App\Service\App;

use App\Entity\File;
use App\Entity\Transfer;
use App\Entity\User;
use App\Enum\FileTypeEnum;
use App\Enum\TransferStateEnum;
use App\Mailing\App\TransferMailing;
use App\Repository\TransferRepository;
use App\Trait\ServiceTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;

final class TransferService
{

    use ServiceTrait;

    private Filesystem $fs;
    private const PUBLIC_DIR = 'public/uploads/transfer/';
    public function __construct(
        private TransferRepository $repository,
        private TransferMailing $transferMailing,
        private SerializerInterface $serializer,
        private Security $security,
        private EntityManagerInterface $em,
        private UrlGeneratorInterface $router,
    ) {
        $this->fs = new Filesystem;
    }

    /**
     * @param Transfer $transfer
     * @param Form $form
     * 
     * @return bool
     */
    public function store(Transfer $transfer, Form $form): bool
    {
        /** @var ?UploadedFile $uploadedFile */
        $uploadedFile = $form->get('file')->getData();
        $transfer->setCreatedAt($this->now())
            ->setState(TransferStateEnum::OPEN->value)
            ->setRules([])
            ->setAccessToken($this->generateToken(80))
            ->setExpiredAt($this->now()->modify('+5 days'))
        ;

        if ($uploadedFile instanceof UploadedFile) {
            $fileName = $this->skipAccents($uploadedFile->getClientOriginalName());
            $file = new File;
            $file->setType(FileTypeEnum::matchMime($uploadedFile->getMimeType()))
                ->setMimeType($uploadedFile->getMimeType())
                ->setSize($uploadedFile->getSize())
                ->setOriginalName($fileName)
                ->setName($fileName)
                ->setCreatedAt($this->now())
                ->setPath(str_replace('public/', '', static::PUBLIC_DIR) . $fileName)
            ;

            if (!$this->fs->exists($this->getUploadDir())) {
                $this->fs->mkdir($this->getUploadDir());
            }

            $uploadedFile->move($this->getUploadDir(), $fileName);
            $transfer->addFile($file);
        }

        try {
            //code...
            $this->em->persist($transfer);
            $this->em->flush();
            $this->transferMailing->transferEmail($transfer);
            $this->addFlash(
                'Transfer envoyé 🚀 
                <hr>
                <input type="text" class="d-none" id="transfer_' . $transfer->getId() . '" value="' . $this->router->generate('app_transfer_show', ['accessToken' => $transfer->getAccessToken()], UrlGeneratorInterface::ABSOLUTE_URL) . '">
                <button type="button" onclick="copyLink(event);" data-copy-element="#transfer_' . $transfer->getId() . '" class="btn btn-success">Copier le lien <i class="bx bx-copy"></i></button>',
                'info'
            );
            return true;
        } catch (\Throwable $th) {
            $this->addFlash($th->getMessage(), 'danger');
            return false;
        }
    }

    /**
     * @return User|null
     */
    private function getUser(): ?User
    {
        $user = $this->security->getUser();

        return $user instanceof User ? $user : null;
    }

    /**
     * @return string
     */
    private function getUploadDir(): string
    {
        return dirname(__DIR__, 3) . '/' . static::PUBLIC_DIR;
    }
}
