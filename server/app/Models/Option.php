<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $table = 'options';
    //
    protected $primaryKey = 'option_id';
    protected $fillable = [
        'option_name',
        'option_price',
        'option_description',
    ];
}
