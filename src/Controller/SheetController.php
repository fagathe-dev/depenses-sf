<?php
namespace App\Controller;

use App\Entity\Sheet;
use App\Form\SheetType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/sheet', name: 'app_sheet_')]
final class SheetController extends AbstractController
{

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(Request $request):RedirectResponse 
    {
        $sheet = new Sheet;
        
        $form = $this->createForm(SheetType::class, $sheet);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->addFlash('success', 'You account is register 🚀');
        }

        return $this->redirectToRoute('app_default');
    }

}