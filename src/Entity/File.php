<?php

namespace App\Entity;

use App\Repository\FileRepository;
use App\Trait\FileTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FileRepository::class)]
class File
{

    use FileTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $size = null;

    #[ORM\Column(length: 255)]
    private ?string $path = null;

    #[ORM\Column(length: 255)]
    private ?string $original_name = null;

    #[ORM\Column(length: 60)]
    private ?string $type = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $created_at = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'files')]
    private ?Transfer $transfer = null;

    private ?string $nice_name = null;
    private ?string $nice_size = null;
    private ?bool $is_previewable = false;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $mime_type = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getNiceName(): ?string
    {
        $this->nice_name = $this->setNiceName();

        return $this->nice_name;
    }

    private function setNiceName(): ?string
    {
        if ($this->getName() === null) {
            return null;
        }

        return '<i class="fs-17 ' . $this->getFileTypeIcon($this->getType()) . '"></i>&nbsp;' . $this->getName();
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    private function setNiceSize(): static
    {
        $this->nice_size = $this->formatSize($this->getSize());

        return $this;
    }

    public function getNiceSize(): string
    {
        $this->setNiceSize();

        return $this->nice_size;
    }

    public function getIsPreviewable(): bool
    {
        return $this->is_previewable = $this->canPreview($this->getType());
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getOriginalName(): ?string
    {
        return $this->original_name;
    }

    public function setOriginalName(string $original_name): static
    {
        $this->original_name = $original_name;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(?\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getTransfer(): ?Transfer
    {
        return $this->transfer;
    }

    public function setTransfer(?Transfer $transfer): static
    {
        $this->transfer = $transfer;

        return $this;
    }

    public function getMimeType(): ?string
    {
        return $this->mime_type;
    }

    public function setMimeType(?string $mime_type): static
    {
        $this->mime_type = $mime_type;

        return $this;
    }
}
