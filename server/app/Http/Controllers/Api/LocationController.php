<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\LocationResource;
use App\Jobs\SendInvoiceEmail;
use App\Models\Agency;
use App\Models\Car;
use App\Models\Client;
use App\Models\Location;
use App\Models\Retour;
use App\Models\Retrait;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use App\Utils\DateUtil;

class LocationController extends BaseController
{

    public function index()
    {
        $locations = Location::with(['client', 'car', 'guarantee', 'retrait', 'retour'])->get();
        return response()->json($locations);
    }

    public function show($id)
    {
        $location = Location::with(['client', 'car', 'guarantee', 'retrait', 'retour'])->find($id);
        if (!$location) {
            return response()->json(['message' => 'Location non trouvé'], 404);
        }

        return response()->json($location);
    }

    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->retrait()->delete();
        $location->retour()->delete();

        $location->delete();

        return response()->json([
            'message' => 'Location annulée avec succès.'
        ], 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'car_id' => 'required|exists:car,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'birth' => 'required|date',
            'address' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'license_number' => 'required|string|max:50',
            'license_issue_date' => 'required|date',
            'license_expiry_date' => 'required|date|after_or_equal:license_issue_date',
            'license_country' => 'required|string|max:100',
            'guarantee_id' => 'exists:garanties,id',
        ]);

        $client = Client::find($request->client_id);
        if(!$client){
            //Vérifie si un client existe avec cet email
            $client = Client::where('client_email', $request->email)->first();
        }
        if($client) {
            $client->update([
                'client_name' => $request->name,
                'client_firstname' => $request->firstname,
                'client_email' => $request->email,
                'client_phone' => $request->phone,
                'client_birth' => $request->birth,
                'client_address' => $request->address,
                'client_postal_code' => $request->postal_code,
                'client_city' => $request->city,
                'client_country' => $request->country,
                'client_license_number' => $request->license_number,
                'client_license_issue_date' => $request->license_issue_date,
                'client_license_expiry_date' => $request->license_expiry_date,
                'client_license_country' => $request->license_country
            ]);
        }else{
            $client = Client::create([
                'client_name' => $request->name,
                'client_firstname' => $request->firstname,
                'client_email' => $request->email,
                'client_phone' => $request->phone,
                'client_birth' => $request->birth,
                'client_address' => $request->address,
                'client_postal_code' => $request->postal_code,
                'client_city' => $request->city,
                'client_country' => $request->country,
                'client_license_number' => $request->license_number,
                'client_license_issue_date' => $request->license_issue_date,
                'client_license_expiry_date' => $request->license_expiry_date,
                'client_license_country' => $request->license_country
            ]);
        }
        $car = $request->car_id;
        $car = Car::findOrFail($car);
        $location = Location::create($request->only(['car_id', 'guarantee_id']) + ['client_id' => $client->id]);
        $retrait = Retrait::create([
            'withdrawal_date' => $request->start_date, DateUtil::DEFAULT_DATE_TIME_PATTERN,
            'location_id' => $location->id,
            'withdrawal_mileage' => $car->car_mileage,
            'withdrawal_default' => $car->car_default,
            'withdrawal_done'=>false,
        ]);

        $retour = Retour::create([
            'return_date' => $request->end_date, DateUtil::DEFAULT_DATE_TIME_PATTERN,
            'location_id' => $location->id,
            'return_mileage' => null,
            'return_default' => $car->car_default,
            'return_done' => false,
        ]);

        SendInvoiceEmail::dispatch($location, $car->agency);

        return response()->json([
            'location' => new LocationResource($location),
            'retrait' => $retrait,
            'retour' => $retour,
            'client' => $client
        ], 201);
    }

    public function getLocationsByCar($carId)
    {
        $locations = Location::where('car_id', $carId)->with(['client', 'car', 'guarantee', 'retrait', 'retour'])->get();
        return response()->json($locations);
    }

    public function downloadInvoice($id)
    {
        $location = Location::with(['client', 'car', 'retrait', 'retour'])->findOrFail($id);
        $agency = Agency::findOrFail($location->car->agency_id);

        SendInvoiceEmail::dispatch($location, $agency);

        $pdf = Pdf::loadView('invoices.facture', compact('location', 'agency'));

        return $pdf->output();
    }

    public function getLocationsByAgency($agencyId){
        $agency = Agency::findOrFail($agencyId);
        $location = Location::whereHas('car', function ($query) use ($agencyId) {
            $query->where('agency_id', $agencyId);
        })->with(['client', 'car', 'guarantee', 'retrait', 'retour'])->get();

        return response()->json([
            'agency' => $agency,
            'locations' => $location
        ]);
    }

    public function update(Request $request, Location $location)
    {
        $validated = $request->validate([
            // Champs date
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',

            // Client
            'name' => 'required|string',
            'firstname' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string|max:20',
            'birth' => 'required|date',
            'address' => 'required|string',
            'postal_code' => 'required|string',
            'city' => 'required|string',
            'country' => 'required|string',
            'license_number' => 'required|string',
            'license_issue_date' => 'required|date',
            'license_expiry_date' => 'required|date',
            'license_country' => 'required|string'

            // Garantie (à faire)

            // Options (à faire)
        ]);

        // Mise à jour client lié
        if ($location->client) {
            $location->client->update([
                'client_name' => $validated['name'],
                'client_firstname' => $validated['firstname'],
                'client_email' => $validated['email'],
                'client_phone' => $validated['phone'],
                'client_birth' => $validated['birth'],
                'client_address' => $validated['address'],
                'client_postal_code' => $validated['postal_code'],
                'client_city' => $validated['city'],
                'client_country' => $validated['country'],
                'client_license_number' => $validated['license_number'],
                'client_license_issue_date' => $validated['license_issue_date'],
                'client_license_expiry_date' => $validated['license_expiry_date'],
                'client_license_country' => $validated['license_country']
            ]);
        }

        // Mise à jour retrait (si existant)
        if ($location->retrait) {
            $location->retrait->update([
                'withdrawal_date' => $validated['start_date'],
            ]);
        }

        // Mise à jour retour (si existant)
        if ($location->retour) {
            $location->retour->update([
                'return_date' => $validated['end_date'],
            ]);
        }

        // Mise à jour options (many-to-many)
//        if (isset($validated['options'])) {
//            $location->options()->sync($validated['options']);
//        }

        return response()->json([
            'message' => 'Location mise à jour avec succès',
            'data' => $location->load('car', 'client', 'guarantee', 'retrait', 'retour')
        ]);
    }

}
