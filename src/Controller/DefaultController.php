<?php

namespace App\Controller;

use App\Entity\Sheet;
use App\Form\SheetType;
use App\Service\App\SheetService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class DefaultController extends AbstractController
{

    public function __construct(private SheetService $sheetService) {}

    #[Route('/', name: 'app_default', methods: ['GET'])]
    public function default(): RedirectResponse
    {
        return $this->redirectToRoute('app_home');
    }

    #[Route('/home', name: 'app_home', methods: ['GET', 'POST'])]
    public function home(Request $request): Response
    {
        $sheet = new Sheet;
        
        $formSheet = $this->createForm(SheetType::class, $sheet);
        $formSheet->handleRequest($request);

        if ($formSheet->isSubmitted() && $formSheet->isValid()) {
            $this->sheetService->store($sheet);
            $this->addFlash('success', 'Sheet created 🚀');
        }

        return $this->render('default/home.html.twig', ['sheets' => $this->getUser()->getSheets(), 'formSheet' => $formSheet]);
    }
}
