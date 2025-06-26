<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'client';

    protected $fillable = [
        'client_name',
        'client_firstname',
        'client_email',
        'client_phone',
        'client_birth',
        'client_address',
        'client_postal_code',
        'client_country',
        'client_city',
        'client_license_number',
        'client_license_issue_date',
        'client_license_expiry_date',
        'client_license_country',
    ];

}
