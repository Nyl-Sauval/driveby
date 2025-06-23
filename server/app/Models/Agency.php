<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agency extends Model
{
    protected $fillable = [
        'agency_name',
        'agency_description',
        'agency_address',
        'agency_postal_code',
        'agency_city',
        'agency_schedules',
        'agency_email',
        'agency_phone',
        'agency_website',
    ];
}
