<?php

namespace App\DataFixtures;

use App\Entity\BudgetCategory;
use App\Entity\User;
use DateTimeImmutable;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{

    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        $admin = new User;
        $admin
            ->setUsername('admin')
            ->setPassword($this->hasher->hashPassword($admin, 'password'))
            ->setEmail('fagathe77@gmail.com')
            ->setRoles(['ROLE_SUPER_ADMIN'])
            ->setCreatedAt(new DateTimeImmutable());

        $manager->persist($admin);

        foreach ($this->budgetCategories() as $b) {
            $budget = new BudgetCategory;

            $budget->setCreatedAt(new DateTimeImmutable)
                ->setDescription($b['description'])
                ->setName($b['name'])
                ->setIcon($b['icon']);

            $manager->persist($budget);
        }

        $manager->flush();
    }

    private function budgetCategories(): array
    {
        return [
            ['name' => 'Achats & Shopping', 'icon' => 'bag', 'description' => 'Tous les achats, dons, cadeaux, high tech, tabac, livres, habillement, etc.'],
            ['name' => 'Animaux', 'icon' => 'tencent-qq', 'description' => null],
            ['name' => 'Autres', 'icon' => 'currency-exchange', 'description' => null],
            ['name' => 'Courses', 'icon' => 'cart', 'description' => 'Toutes les courses aux supermarchés, épicerie, marché, etc.'],
            ['name' => 'Epargne & placement', 'icon' => 'piggy-bank', 'description' => null],
            ['name' => 'Impôts, taxes, frais', 'icon' => 'bank', 'description' => null],
            ['name' => 'Logement & charges', 'icon' => 'house', 'description' => null],
            ['name' => 'Loisirs & vacances', 'icon' => 'brightness-high', 'description' => 'Toutes les dépenses pour les loisirs, sports, activités, voyage, abonnement multimédia, etc.'],
            ['name' => 'Restaurants', 'icon' => 'shop', 'description' => null],
            ['name' => 'Santé', 'icon' => 'hospital', 'description' => null],
            ['name' => 'Transports', 'icon' => 'train-front', 'description' => null],
            ['name' => 'Voitures', 'icon' => 'car-front', 'description' => 'Toutes les dépenses pour la voiture: essence, entretien, réparation, etc.'],

        ];
    }
}
