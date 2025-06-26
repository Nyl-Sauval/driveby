<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClientController extends BaseController
{
    public function update(Request $request)
    {
        //Récupération du client à modifier l'id de l'url
        $id_client= $request->route('id');
        $client = Client::findOrFail($id_client);

        //Vérification des droits
        //Si le user demandeur est admin ou si un user veut modifier sont profil c'est OK sinon Unauthaurized
        if(Auth::user()->client_id == null && Auth::user()->role != 'admin') {
            if (Auth::user()->client_id != $client->id) {
                return $this->sendError('Unauthorized.', ['error' => 'You are not authorized to perform this operation.'], 403);
            }
        }

        //validation des données
        try {
            $request->validate([
                'client_name' => 'required|string|max:255',
                'client_firstname' => 'required|string|max:255',
                'client_email' => 'required|email|max:255|unique:client,client_email,' . $client->id,
                'client_phone' => 'nullable|string|max:20',
                'client_birth' => 'nullable|date',
                'client_address' => 'nullable|string|max:255',
                'client_postal_code' => 'nullable|string|max:10',
                'client_city' => 'nullable|string|max:100',
                'client_country' => 'nullable|string|max:100',
                'client_license_number' => 'nullable|string|max:50',
                'client_license_issue_date' => 'nullable|date',
                'client_license_expiry_date' => 'nullable|date',
                'client_license_country' => 'nullable|string|max:100',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        //Mise à jour des données du client
        $client->update($request->all());
        //Mise a jour du user associé au client
        $user = $client->user;
        if ($user) {
            $user->email = $request->input('client_email');
            $user->save();
        }
        //Retourne le client mis à jour
        return $this->sendResponse($client, 'Client updated successfully.');
    }

    public function show(string $id)
    {
        //Récupération du client à afficher
        $client = Client::findOrFail($id);
        //Vérification des droits
        if(Auth::user()->client_id == null && Auth::user()->role != 'admin') {
            if (Auth::user()->client_id != $client->id) {
                return $this->sendError('Unauthorized.', ['error' => 'You are not authorized to perform this operation.'], 403);
            }
        }
        //Retourne le client
        return $this->sendResponse($client, 'Client retrieved successfully.');
    }
}
