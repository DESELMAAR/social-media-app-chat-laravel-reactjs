<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Make sure to import the User model

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validate the request
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            // Get the authenticated user
            $user = Auth::user();

            // Generate a token for the user
            $token = $user->createToken('authToken')->plainTextToken;

            // Return the token and user information
            return response([
                'msg' => 'Login successful',
                'user' => $user,
                'token' => $token,
            ], 200);
        } else {
            // Return error response if authentication fails
            return response([
                'msg' => 'Invalid credentials',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();

        return response([
            'msg' => 'Logged out successfully',
        ], 200);
    }
}