<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'category_name',
        'category_description',
    ];

    public function cars()
    {
        return $this->belongsToMany(Car::class);
    }

}
