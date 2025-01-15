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
            // Log the incoming request data
            Log::info('Data received from frontend:', $request->all());
    
            // Debug: Check if the request reaches this point
            Log::info('Edit method called for user ID:', ['id' => $id]);
    
            // Find the user by ID
            $user = User::findOrFail($id);
    
            // Debug: Check if the user is found
            Log::info('User found:', $user->toArray());
    
            // Validate the request data
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:8', // Make password optional
                'gender' => 'sometimes|boolean',
                'phone' => 'sometimes|string|regex:/^[0-9]{10}$/',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
    
            // Log the validated data
            Log::info('Validated data:', $validatedData);
    
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
    
                // Log the new image path
                Log::info('New image uploaded:', ['image_path' => $validatedData['image']]);
            }
    
            // Update the user's password if provided
            if (!empty($validatedData['password'])) {
                $validatedData['password'] = Hash::make($validatedData['password']);
                Log::info('Password updated for user:', ['user_id' => $user->id]);
            } else {
                // Remove the password field if it's not provided
                unset($validatedData['password']);
            }
    
            // Update the user's data
            $user->fill($validatedData)->save();
    
            // Log the updated user data
            Log::info('User updated successfully:', $user->toArray());
    
            // Return a success response
            return response()->json([
                'message' => 'User updated successfully',
                'user' => $user,
            ], 200);
    
        } catch (ValidationException $e) {
            // Log validation errors
            Log::error('Validation failed:', $e->errors());
    
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
    
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Profile update error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong during profile update.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getuser($id)
{
    try {
        // Find the user by ID
        $user = User::find($id);

        // Check if the user exists
        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        // Return the user data
        return response()->json([
            'message' => 'User retrieved successfully',
            'user' => $user,
        ], 200);

    } catch (\Exception $e) {
        // Log the error for debugging purposes
        Log::error('Get user error: ' . $e->getMessage());

        // Handle exceptions (e.g., database errors)
        return response()->json([
            'message' => 'Something went wrong while retrieving the user.',
            'error' => $e->getMessage(),
        ], 500);
    }
}
}