<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retrait extends Model

{
    use HasFactory;

    protected $table = 'retrait';

    protected $primaryKey = 'withdrawal_id';

    protected $fillable = [
        'withdrawal_date',
        'withdrawal_interior_status_car',
        'withdrawal_exterior_status_car',
        'withdrawal_mileage',
        'withdrawal_default',
        'withdrawal_fuel_level',
        'withdrawal_done',
        'user_id',
        'location_id',
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
