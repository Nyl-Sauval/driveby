<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    use HasFactory;

    protected $table = 'location';

    protected $fillable = [
        'guarantee_id',
        'car_id',
        'client_id',
    ];

    public function documents()
    {
        return $this->belongsToMany(Document::class);
    }

    public function options()
    {
        return $this->belongsToMany(Option::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
}
