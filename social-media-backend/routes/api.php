<?php 

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post("/register",[RegisterController::class,"register"]);

Route::post("/login",[LoginController::class,"login"]);


Route::get('/edit/{id}', [RegisterController::class, 'getuser']); // get  endpoint
Route::put('/users/{id}', [RegisterController::class, 'edit']); // Edit endpoint

Route::post('/test', function (Request $request) {
    log::info('Test data received:', $request->all());
    return response()->json($request->all());
});


use App\Http\Controllers\PostController;

// Posts API
Route::get('/posts', [PostController::class, 'index']); // Display all posts
Route::get('/posts/{id}', [PostController::class, 'show']); // Display a specific post
Route::post('/posts', [PostController::class, 'store']); // Add a new post
Route::put('/posts/{id}', [PostController::class, 'update']); // Update an existing post
Route::delete('/posts/{id}', [PostController::class, 'destroy']); // Delete a post