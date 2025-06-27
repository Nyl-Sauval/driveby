<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Retour extends Model

{
    use HasFactory;
    //
    protected $table = 'retour';
    protected $primaryKey = 'return_id';

    protected $fillable = [
        'return_date',
        'return_status_car',
        'return_mileage',
        'return_default',
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
