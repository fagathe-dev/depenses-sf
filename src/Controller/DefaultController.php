<?php

namespace App\Controller;

use App\Repository\SheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class DefaultController extends AbstractController
{

    #[Route('/', name: 'app_default', methods: ['GET'])]
    public function default(): RedirectResponse
    {
        return $this->redirectToRoute('app_home');
    }

    #[Route('/home', name: 'app_home', methods: ['GET'])]
    public function home(SheetRepository $repository): Response
    {
        return $this->render('default/home.html.twig', ['sheets' => $this->getUser()->getSheets()]);
    }
}
