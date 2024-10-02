<?php

namespace App\Enum;

use App\Service\File\UploadFile;

enum FileTypeEnum: string
{
    case Archive = 'Archive';
    case Audio = 'Audio';
    case Code = 'Code';
    case Image = 'Image';
    case PDF = 'PDF';
    case Presentation = 'Présentation';
    case Tableur = 'Tableur';
    case Traitement_De_Texte = 'Traitement de texte';
    case Texte = 'Texte';
    case Video = 'Vidéo';


    public static function matchMime(string $mimeType): ?string
    {
        return match (true) {
            in_array($mimeType, UploadFile::ARCHIVE_MIMES) => static::Archive->value,
            in_array($mimeType, UploadFile::AUDIO_MIMES) => static::Audio->value,
            in_array($mimeType, UploadFile::CODE_MIMES) => static::Code->value,
            in_array($mimeType, UploadFile::IMAGE_MIMES) => static::Image->value,
            in_array($mimeType, UploadFile::PDF_MIMES) => static::PDF->value,
            in_array($mimeType, UploadFile::PRESENTATION_MIMES) => static::Presentation->value,
            in_array($mimeType, UploadFile::TABLEUR_MIMES) => static::Tableur->value,
            in_array($mimeType, UploadFile::TRAITEMENT_DE_TEXTE_MIMES) => static::Texte->value,
            in_array($mimeType, UploadFile::TEXTE_MIMES) => static::Traitement_De_Texte->value,
            in_array($mimeType, UploadFile::VIDEO_MIMES) => static::Video->value,
            default => null
        };
    }
}
