<?php
namespace App\Controller;

use App\Repository\SheetRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

final class DefaultController extends AbstractController {

    #[Route('/home', name: 'app_default', methods: ['GET'])]
    public function home(SheetRepository $repository):Response {
        return $this->render('default/home.html.twig', ['sheets' => $repository->findAll()]);
    }

}
