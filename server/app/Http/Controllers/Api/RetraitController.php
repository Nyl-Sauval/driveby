<?php

namespace App\Http\Controllers\Api;

use App\Models\Retrait;
use Illuminate\Routing\Controller;


class RetraitController extends Controller
{
    public function index()
    {
        //dd(Retrait::all());
        return response()->json(Retrait::all());
    }

}
