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

}
