<?php
namespace App\Service\Auth;

use App\Entity\User;
use App\Mailing\Auth\AuthMailing;
use App\Repository\UserRepository;
use App\Trait\ServiceTrait;
use Cocur\Slugify\Slugify;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGenerator;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class AuthService
{

    use ServiceTrait;

    /**
     * @var Slugify $slugger
     */
    private $slugger;

    public function __construct(
        private UserRepository $repository,
        private ValidatorInterface $validator,
        private SerializerInterface $serializer,
        private EntityManagerInterface $manager,
        private UrlGeneratorInterface $router,
        private AuthMailing $mailing,
        private UserPasswordHasherInterface $hasher
    ) {
        $this->repository = $repository;
        $this->validator = $validator;
        $this->serializer = $serializer;
        $this->manager = $manager;
        $this->router = $router;
        $this->mailing = $mailing;
        $this->hasher = $hasher;
        $this->slugger = new Slugify;
    }

    /**
     * @param User $user
     *
     * @return object
     */
    public function store(User $user): void
    {
        $user
            ->setPassword($this->hasher->hashPassword($user, $user->getPassword()))
            ->setCreatedAt($this->now())
            ->setUsername($user->getUsername() ?? $this->generateUserName($user))
            ->setRoles(['ROLE_USER'])
            ->setConfirm(false)
            ->setToken($this->generateTokenBase64($user))
        ;

        $this->manager->persist($user);
        $this->manager->flush();

        // $this->mailing->confirmEmail($user);

    }

    /**
     * @param null|array $data
     *
     * @return void
     */
    public function forgotPassword(?array $data = null): void
    {
        if (array_key_exists('email', $data)) {
            $user = $this->repository->findOneBy(['email' => $data['email']]);

            if ($user instanceof User) {
                $user->setToken($this->generateTokenBase64($user));

                $this->mailing->forgotPassword($user);

                $this->manager->flush();
            }
        }
    }

}