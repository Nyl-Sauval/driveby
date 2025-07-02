<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avenant extends Model
{

    use HasFactory;

    protected $table = 'avenant';

    protected $primaryKey = 'avenant_id';

    protected $fillable = [
        'avenant_date',
        'avenant_details',
        'avenant_price',
        'location_id',
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
