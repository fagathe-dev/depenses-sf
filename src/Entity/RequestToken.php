<?php

namespace App\Entity;

use App\Repository\RequestTokenRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RequestTokenRepository::class)]
class RequestToken
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $code = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $expired_at = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getExpiredAt(): ?\DateTimeImmutable
    {
        return $this->expired_at;
    }

    public function setExpiredAt(\DateTimeImmutable $expired_at): static
    {
        $this->expired_at = $expired_at;

        return $this;
    }
}
