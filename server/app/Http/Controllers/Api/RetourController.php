<?php

namespace App\Http\Controllers\Api;

use App\Models\Retour;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;


class RetourController extends Controller
{
    public function index()
    {
        return response()->json(Retour::all());
    }

    public function show($id)
    {
        $retour = Retour::find($id);
        if (!$retour) {
            return response()->json(['message' => 'Retour non trouvé'], 404);
        }

        return response()->json($retour);
    }

    public function update(Request $request, Retour $retour) {
        $validated = $request->validate([
            'return_date' => 'required|date',
            'return_mileage' => 'required|numeric',
            'return_fuel_level' => 'required|integer',
            'return_interior_status_car' => 'required|string',
            'return_exterior_status_car' => 'required|string',
            'return_default' => 'nullable|string',
            'return_done' => 'required|boolean',
        ]);

        $retour->update($validated);

        return response()->json([
            'message' => 'Retrait mis à jour avec succès',
            'data' => $retour
        ]);
    }

}
