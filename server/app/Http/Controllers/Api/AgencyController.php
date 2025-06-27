<?php
namespace App\Http\Controllers\Api;


use App\Models\Agency;


class AgencyController extends \Illuminate\Routing\Controller
{
    public function index()
    {
        return response()->json(Agency::all());
    }

}
