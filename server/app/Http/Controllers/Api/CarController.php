<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CarCollection;
use App\Http\Resources\CarResource;
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

    public function show($carId)
    {
        $car = Car::with(['agency', 'categories'])->findOrFail($carId);
        return response()->json(new CarResource($car));
    }
}
