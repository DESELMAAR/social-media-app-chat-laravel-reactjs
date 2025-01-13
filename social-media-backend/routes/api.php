<?php 

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post("/register",[RegisterController::class,"register"]);

Route::post("/login",[LoginController::class,"login"]);

Route::put('/edit/{id}', [RegisterController::class, 'edit']); // Edit endpoint