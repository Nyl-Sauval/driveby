<?php

namespace App\Enums;

enum Disponibility: string
{
    case DISPONIBLE = 'Disponible';
    case EN_MAINTENANCE = 'En maintenance';
    case EN_REPARATION = 'En réparation';
    case INDISPONIBLE = 'Indisponible';

}
