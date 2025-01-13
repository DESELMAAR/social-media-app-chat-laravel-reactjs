<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    // Register endpoint (existing code)
    public function register(Request $request)
    {
        try {
            // Validation des données
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8', // Minimum password length for security
                'gender' => 'required|boolean',
                'phone' => 'required|string|regex:/^[0-9]{10}$/', // Ensure phone is 10 digits
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image input
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public'); // Store in storage/app/public/images
                Log::info('Image stored at: ' . $imagePath); // Log the image path
                $validatedData['image'] = Storage::disk('public')->url($imagePath); // Generate public URL
            }

            // Création de l'utilisateur
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'gender' => $validatedData['gender'],
                'phone' => $validatedData['phone'],
                'image' => $validatedData['image'] ?? null, // Save image URL if provided
            ]);

            // Retourner une réponse JSON
            return response()->json([
                'message' => 'User registered successfully',
                'user' => $user,
            ], 201);

        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Registration error: ' . $e->getMessage());

            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong during registration.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Edit endpoint for updating user profile
    public function edit(Request $request, $id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Validate the request data
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255', // Optional field
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id, // Ensure email is unique except for the current user
                'password' => 'sometimes|string|min:8', // Optional field
                'gender' => 'sometimes|boolean', // Optional field
                'phone' => 'sometimes|string|regex:/^[0-9]{10}$/', // Optional field
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Optional field
            ]);

            // Handle image upload if a new image is provided
            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($user->image) {
                    $oldImagePath = str_replace(Storage::disk('public')->url(''), '', $user->image);
                    Storage::disk('public')->delete($oldImagePath);
                }

                // Store the new image
                $imagePath = $request->file('image')->store('images', 'public');
                $validatedData['image'] = Storage::disk('public')->url($imagePath);
            }

            // Update the user's password if provided
            if (isset($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
            }

            // Update the user's data
            $user->update($validatedData);

            // Return a success response
            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user,
            ], 200);

        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Profile update error: ' . $e->getMessage());

            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong during profile update.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}