<?php
namespace App\Http\Controllers;


use App\Models\Ingredient;
use App\Models\Car;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;


class CarController extends \Illuminate\Routing\Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $agency_id = $request->input('agency_id');
        Log::info('Received agency_id:', ['agency_id' => $agency_id]);

        $carsQuery = Car::with('agency');

        if ($agency_id) {
            $carsQuery->where('agency_id', $agency_id);
        }
        Log::info('SQL Query:', [$carsQuery->toSql(), $carsQuery->getBindings()]);

        $cars = $carsQuery->get();

        return response()->json([
            'data' => $cars,
            'filtered_by' => $agency_id
        ]);
    }


    public function resetCookies()
    {
        Cookie::queue(Cookie::forget('cat'));


        return redirect()->route('recettes.index')->with('success', 'Cookies réinitialisés avec succès.');
    }
}
