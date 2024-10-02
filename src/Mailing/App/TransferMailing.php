<?php

namespace App\Mailing\App;

use App\Entity\Transfer;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;

class TransferMailing
{

    /**
     * @var MailerInterface $mailer
     */
    private $mailer;

    public const DEFAULT_MAIL_SENDER = 'noreply@fagathe-dev.me';

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
    

    public function transferEmail(Transfer $transfer)
    {
        $email = (new TemplatedEmail)
            ->from(static::DEFAULT_MAIL_SENDER)
            ->to(join(', ', $transfer->getRecepients()))
            ->subject($transfer->getEmiter() . ' vous a envoyé ' . ($transfer->getName() ?? 'des fichiers') . ' via FileTransfer')
            ->htmlTemplate('emails/app/transfer.html.twig')
            ->embedFromPath('images/logo.png', 'logo')
            ->context(compact('transfer'));

        return $this->mailer->send($email);
    }
}
