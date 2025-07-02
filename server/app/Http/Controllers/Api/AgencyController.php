<?php
namespace App\Http\Controllers\Api;


use App\Models\Agency;


class AgencyController extends BaseController
{
    public function index()
    {
        return response()->json(Agency::all());
    }

    public function show($id)
    {
        $agency = Agency::findOrFail($id);
        return response()->json($agency);
    }

}
