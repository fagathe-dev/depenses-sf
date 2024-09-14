<?php

namespace App\DataFixtures;

use App\Entity\User;
use DateTimeImmutable;
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
        ->setPassword($this->hasher->hashPassword($cherie, 'password'))
        ->setEmail('catherine.n@live.fr')
        ->setRoles(['ROLE_ADMIN'])
        ->setCreatedAt(new DateTimeImmutable());
        
        $bae = new User;
        $bae
            ->setUsername('bae')
            ->setPassword($this->hasher->hashPassword($bae, 'password'))
            ->setEmail('fagathe77@gmail.com')
            ->setRoles(['ROLE_ADMIN'])
            ->setCreatedAt(new DateTimeImmutable());

        $manager->persist($cherie);
        $manager->persist($bae);


        $manager->flush();
    }
}
