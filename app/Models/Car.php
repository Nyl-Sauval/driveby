<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'car_brand',
        'car_registration',
        'car_model',
        'fuel',
        'car_mileage',
        'picture',
        'car_default',
        'car_price',
        'agency_id'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

}
