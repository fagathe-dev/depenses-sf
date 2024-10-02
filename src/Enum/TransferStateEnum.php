<?php

namespace App\Enum;

use App\Service\File\UploadFile;

enum TransferStateEnum: string
{
    case EXPIRED = 'Expired';
    case OPEN = 'Open';

}
