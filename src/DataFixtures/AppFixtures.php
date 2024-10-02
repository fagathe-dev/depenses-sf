<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Trait\FakerTrait;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    use FakerTrait;

    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $admin = new User;
        $admin
            ->setUsername('admin')
            ->setPassword($this->hasher->hashPassword($admin, 'password'))
            ->setEmail('fagathe77@gmail.com')
            ->setRoles(['ROLE_SUPER_ADMIN'])
            ->setCreatedAt(new DateTimeImmutable())
            ->setUpdatedAt($this->setDateTimeAfter($admin->getCreatedAt()));

        $manager->persist($admin);


        $manager->flush();
    }

}
