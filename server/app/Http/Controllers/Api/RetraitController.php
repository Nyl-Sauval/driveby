<?php

namespace App\Http\Controllers\Api;

use App\Jobs\SendRetraitEmail;
use App\Models\Retrait;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


class RetraitController extends Controller
{
    public function index()
    {
        //dd(Retrait::all());
        return response()->json(Retrait::all());
    }

    public function show($id)
    {
        $retrait = Retrait::find($id);
        if (!$retrait) {
            return response()->json(['message' => 'Retrait non trouvé'], 404);
        }

        return response()->json($retrait);
    }

    public function update(Request $request, Retrait $retrait) {
        $validated = $request->validate([
            'withdrawal_date' => 'required|date',
            'withdrawal_mileage' => 'required|numeric',
            'withdrawal_fuel_level' => 'required|integer',
            'withdrawal_interior_status_car' => 'required|string',
            'withdrawal_exterior_status_car' => 'required|string',
            'withdrawal_default' => 'nullable|string',
            'withdrawal_done' => 'required|boolean',
        ]);

        $retrait->update($validated);
        $location = $retrait->location;

        SendRetraitEmail::dispatch($location);

        return response()->json([
            'message' => 'Retrait mis à jour avec succès',
            'data' => $retrait
        ]);
    }

}
