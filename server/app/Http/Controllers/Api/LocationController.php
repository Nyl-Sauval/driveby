<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\LocationResource;
use App\Models\Car;
use App\Models\Location;
use App\Models\Retour;
use App\Models\Retrait;
use Illuminate\Http\Request;

class LocationController extends BaseController
{

    public function index()
    {
        $locations = Location::with(['client', 'car', 'guarantee', 'retrait', 'retour'])->get();
        return response()->json($locations);
    }

    public function create(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:car,id',
            'client_id' => 'required|exists:client,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        $car = $request->car_id;
        $car = Car::findOrFail($car);
        $location = Location::create($request->only(['car_id', 'client_id']) + ['guarantee_id' => 1]);
        $retrait = Retrait::create([
            'withdrawal_date' => $request->start_date,
            'location_id' => $location->id,
            'withdrawal_mileage' => $car->car_mileage,
            'withdrawal_default' => $car->car_default,
            'withdrawal_done'=>false,
        ]);

        $retour = Retour::create([
            'return_date' => $request->end_date,
            'location_id' => $location->id,
            'return_mileage' => null,
            'return_default' => $car->car_default,
            'return_done' => false,
        ]);

        return response()->json([
            'location' => new LocationResource($location),
            'retrait' => $retrait,
            'retour' => $retour
        ], 201);
    }

    public function getLocationsByCar($carId)
    {
        $locations = Location::where('car_id', $carId)->with(['client', 'car', 'guarantee', 'retrait', 'retour'])->get();
        return response()->json($locations);
    }
}
