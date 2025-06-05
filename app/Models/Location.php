<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
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
}
