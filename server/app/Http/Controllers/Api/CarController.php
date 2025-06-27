<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarCollection;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with(['agency', 'categories'])->get();
        return new CarCollection($cars);
    }

}
