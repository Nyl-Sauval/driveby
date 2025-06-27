<?php

namespace App\Http\Controllers\Api;

use App\Models\Location;
use Illuminate\Routing\Controller;


class LocationController extends Controller
{
    public function index()
    {
        return response()->json(Location::all());
    }

}
