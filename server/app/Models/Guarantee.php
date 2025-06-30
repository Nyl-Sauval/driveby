<?php


namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;


class Guarantee extends Model
{

    use HasFactory;

    protected $table = 'garanties';
    protected $primaryKey = 'guarantee_id';

    protected $fillable = [
        'guarantee_name',
        'guarantee_price',
        'guarantee_description'
    ];
}
