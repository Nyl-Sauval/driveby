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
Route::get('categories', [CategoryController::class, 'index']);
Route::put('client/{id}', [ClientController::class, 'update'])->name('client.update')->middleware('auth:sanctum');;

Route::get('locations', [LocationController::class, 'index']);
Route::post('locations', [LocationController::class, 'create'])->name('location.create');
Route::get('cars/{carId}/locations', [LocationController::class, 'getLocationsByCar'])->name('location.getByCar');
Route::get('/locations/{id}/invoice', [LocationController::class, 'downloadInvoice']);

Route::delete('locations/{id}', [LocationController::class, 'destroy']);
