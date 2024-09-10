<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(private UserPasswordHasherInterface $hasher){}

    public function load(ObjectManager $manager): void
    {
        $cherie = new User;
        $cherie
            ->setUsername('macherie')
            ->setPassword($this->hasher->hashPassword($cherie, 'password'));

        $manager->flush();
    }
}
