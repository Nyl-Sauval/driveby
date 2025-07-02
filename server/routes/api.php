<?php

use App\Http\Controllers\Api\AgencyController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\Api\RetourController;
use App\Http\Controllers\Api\RetraitController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OptionController;

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});

// Route de test
Route::get('test', function () {
    return response()->json(['message' => 'API routes are working']);
});

// Auth
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->get('profil', [AuthController::class, 'me'])->name('profil');
Route::middleware('auth:sanctum')->get('client/{id}', [ClientController::class, 'show'])->name('client.show');

Route::get('cars', [CarController::class, 'index'])->name('car.index');
Route::get('cars/{carId}', [CarController::class, 'show'])->name('car.show');
Route::get('agencies', [AgencyController::class, 'index']);
Route::get('agencies/{id}', [AgencyController::class, 'show'])->name('agency.show');
Route::get('categories', [CategoryController::class, 'index']);

Route::put('client/{id}', [ClientController::class, 'update'])->name('client.update')->middleware('auth:sanctum');;

Route::get('locations', [LocationController::class, 'index']);
Route::post('locations', [LocationController::class, 'create'])->name('location.create');
Route::get('cars/{carId}/locations', [LocationController::class, 'getLocationsByCar'])->name('location.getByCar');
Route::get('/locations/{id}/invoice', [LocationController::class, 'downloadInvoice']);
Route::get('/locations/{id}/avenant', [LocationController::class, 'downloadAvenant']);

Route::delete('locations/{id}', [LocationController::class, 'destroy']);

Route::get('/agency/{id}/locations', [LocationController::class, 'getLocationsByAgency'])->name('location.getByAgency');

Route::put('retrait/{retrait}', [RetraitController::class, 'update']);
Route::get('retrait/{id}', [RetraitController::class, 'show']);

Route::put('retour/{retour}', [RetourController::class, 'update']);
Route::get('retour/{id}', [RetourController::class, 'show']);

Route::get('location/{id}', [LocationController::class, 'show']);
Route::put('location/{location}', [LocationController::class, 'update']);


Route::get('/options', [OptionController::class, 'index']);
