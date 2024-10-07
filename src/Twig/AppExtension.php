<?php

namespace App\Twig;

use App\Entity\File;
use App\Trait\ServiceTrait;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class AppExtension extends AbstractExtension
{
    use ServiceTrait;

    public function getFilters(): array
    {
        return [
            // the logic of this filter is now implemented in a different class
            new TwigFilter('file_widget', [$this, 'fileWidget'], ['is_safe' => ['html']]),
        ];
    }

    public function getFunctions(): array
    {
        return [
            // the logic of this filter is now implemented in a different class
            new TwigFunction('skip_accent', [$this, 'skipAccent']),
        ];
    }

    public function fileWidget(File $file): ?string
    {
        return $file->getNiceName();
    }

    public function skipAccent(string $str):string
    {
        return $this->skipAccents($str);
    }
}
