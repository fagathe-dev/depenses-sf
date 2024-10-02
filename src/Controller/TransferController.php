<?php

namespace App\Controller;

use App\Entity\Transfer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/transfer', name: 'app_transfer_')]
final class TransferController extends AbstractController
{

    public function __construct() {}


    #[Route('/{accessToken}', name: 'show', methods: ['GET'])]
    public function show(Transfer $transfer): Response
    {
        return $this->render('transfer/show.html.twig', compact('transfer'));
    }
}
