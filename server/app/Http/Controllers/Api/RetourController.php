<?php

namespace App\Http\Controllers\Api;

use App\Models\Retour;
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

}
