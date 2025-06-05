<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Model;


class Garantie extends Model
{
    protected $primaryKey = 'guarantee_id';

    protected $fillable = [
        'guarantee_name',
        'guarantee_price',
        'guarantiee_description'
    ];
}
