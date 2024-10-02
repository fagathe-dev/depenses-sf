<?php

namespace App\Controller;

use App\Entity\Transfer;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/emails', name: 'emails_')]
final class EmailController extends AbstractController
{
    public function __construct() {}

    #[Route('/transfer', name: 'transfer', methods: ['GET'])]
    public function transfer(): Response
    {
        $transfer = new Transfer;
        $transfer->setEmiter('fagathe77@gmail.com')
            ->setRecepients(['catherine.n@live.fr'])
            ->setName('vidéo training 01/10')
            ->setMessage('Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, iure adipisci veniam pariatur consectetur aliquam delectus, esse magni mollitia dolore odit modi nesciunt illo nobis perferendis saepe molestiae, velit iusto.')
            ->setExpiredAt((new DateTimeImmutable)->modify('+7 days'))
            ->setAccessToken('azeazeaze')
        ;

        return $this->render('emails/app/transfer.html.twig', compact('transfer'));
    }
}
