<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientResource;
use App\Http\Resources\UserResource;
use App\Models\Client;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    public function register(Request $request): JsonResponse {
        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:user',
            'phone' => 'required|string|max:15',
            'dob' => 'required|date',
            'password' => 'required|string|min:8',
        ]);

        $client = Client::create([
            'client_name' => $validateData['name'],
            'client_firstname' => $validateData['firstname'],
            'client_email' => $validateData['email'],
            'client_phone' => $validateData['phone'],
            'client_birth' => $validateData['dob'],
        ]);

        $user = User::create([
            'email' => $validateData['email'],
            'password' => bcrypt($validateData['password']),
            'client_id' => $client->id,
            'role' => 'user',
        ]);

        $success['token'] = $user->createToken('auth_token')->plainTextToken;
        $success['token_type'] = 'Bearer';
        $success['name'] = $user->name;

        return $this->sendResponse($success, 'User registered successfully.');
    }

    public function login(Request $request): JsonResponse {
        $validateData = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $validateData['email'])->first();

        if (!$user || !password_verify($validateData['password'], $user->password)) {
            return $this->sendError('Unauthorized', [], 401);
        }

        $success['token'] = $user->createToken('auth_token')->plainTextToken;
        $success['token_type'] = 'Bearer';
        $success['name'] = $user->name;

        return $this->sendResponse($success, 'User logged in successfully.');
    }

    public function me(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return $this->sendError('Utilisateur non authentifié', [], 401);
        }

        return response()->json(new UserResource($user->load('client')));}
}
