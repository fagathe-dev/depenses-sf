<?php

namespace App\Controller;

use App\Entity\File;
use App\Repository\TransferRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File as DownloadedFile;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/transfer', name: 'app_transfer_')]
final class TransferController extends AbstractController
{

    public function __construct(private TransferRepository $transferRepository) {}


    #[Route('/{accessToken}', name: 'show', methods: ['GET'])]
    public function show(string $accessToken): Response
    {
        $transfer = $this->transferRepository->findOneBy(compact('accessToken'));

        return $this->render('transfer/show.html.twig', compact('transfer'));
    }

    #[Route('/file/download/{id}', name: 'file_download', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function download(File $file): Response
    {
        $dowmloadedFile = new DownloadedFile($file->getPath());

        return $this->file($dowmloadedFile, $file->getOriginalName(), ResponseHeaderBag::DISPOSITION_ATTACHMENT);
    }
}
