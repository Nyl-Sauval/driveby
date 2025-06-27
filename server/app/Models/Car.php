<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{

    protected $table = 'car';

    protected $fillable = [
        'car_brand',
        'car_registration',
        'car_model',
        'car_fuel',
        'car_mileage',
        'car_picture',
        'car_default',
        'car_price',
        'agency_id'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'car_category');
    }

    public function agency()
    {
        return $this->belongsTo(Agency::class, 'agency_id');
    }

}
