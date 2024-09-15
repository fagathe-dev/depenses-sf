<?php

namespace App\Service\App;

use App\Entity\Sheet;
use App\Entity\User;
use App\Repository\SheetRepository;
use App\Trait\ServiceTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

final class SheetService
{
    use ServiceTrait;

    public function __construct(
        private EntityManagerInterface $manager,
        private SheetRepository $repository,
        private Security $security,
    ) {}

    /**
     * @param Sheet $sheet
     * 
     * @return void
     */
    public function store(Sheet $sheet): void
    {
        $sheet->getId() === null ? $sheet->setCreatedAt($this->now()) : $sheet->setUpdatedAt($this->now());
        $user = $this->getUser();
        $sheet->setUser($user)
            ->setActive(true);

        $this->manager->persist($sheet);
        $this->manager->flush();
    }


    private function getUser(): ?User
    {
        $user =  $this->security->getUser();

        if ($user instanceof User) {
            return $user;
        }

        return null;
    }
}
