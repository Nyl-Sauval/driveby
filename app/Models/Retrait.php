<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retrait extends Model

{

    protected $primaryKey = 'withdrawal_id';

    protected $fillable = [
        'withdrawal_date',
        'withdrawal_status_car',
        'withdrawal_mileage',
        'withdrawal_default',
        'user_id',
        'location_id'
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
