<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{

    use HasFactory;

    protected $table = 'document';
    protected $primaryKey = 'document_id';

    protected $fillable = [
        'document_type',
        'document_name',
        'document_link',
    ];
}
