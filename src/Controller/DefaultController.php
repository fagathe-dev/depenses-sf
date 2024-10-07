<?php

namespace App\Controller;

use App\Entity\Sheet;
use App\Entity\Transfer;
use App\Form\TransferType;
use App\Service\App\TransferService;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class DefaultController extends AbstractController
{

    public function __construct(private TransferService $transferService) {}

    #[Route('/', name: 'app_default', methods: ['GET'])]
    public function default(): RedirectResponse
    {
        return $this->redirectToRoute('app_home');
    }

    #[Route('/home', name: 'app_home', methods: ['GET', 'POST'])]
    public function home(Request $request): Response
    {
        $transfer = new Transfer;
        $transfer->setRecepients(['']);

        $form = $this->createForm(TransferType::class, $transfer);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $this->transferService->store($transfer, $form);

            return $this->redirectToRoute('app_home');
        }

        return $this->render('default/home.html.twig', compact('form'));
    }
}
