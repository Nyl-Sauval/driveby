<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('test', function () {
    return response()->json(['message' => 'API routes are working']);
});
Route::post('register', [AuthController::class, 'register'])->name('register');
