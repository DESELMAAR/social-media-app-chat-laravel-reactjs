<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage; // Import the Storage facade
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    // Display all posts
    public function index()
    {
        try {
            $posts = Post::with('user')
                ->orderBy('updated_at', 'desc')
                ->get(); // Include user details in the response
            return response()->json([
                'message' => 'Posts retrieved successfully',
                'posts' => $posts,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving posts: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while retrieving posts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Display a specific post
    public function show($id)
    {
        try {
            $post = Post::with('user')->find($id); // Include user details in the response

            if (!$post) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }

            return response()->json([
                'message' => 'Post retrieved successfully',
                'post' => $post,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving post: ' . $e->getMessage());
            return response()->json([
                'message' => 'Something went wrong while retrieving the post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Add a new post
    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'user_id' => 'required|exists:users,id', // Ensure the user exists
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image input
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('posts', 'public'); // Store in storage/app/public/posts
                $validatedData['image'] = Storage::disk('public')->url($imagePath); // Generate public URL
            }

            // Create the post
            $post = Post::create($validatedData);

            // Log the created post
            Log::info('Post created:', $post->toArray());

            return response()->json([
                'message' => 'Post created successfully',
                'post' => $post,
            ], 201);
        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error creating post: ' . $e->getMessage());

            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong while creating the post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Update an existing post
    public function update(Request $request, $id)
    {
        try {
            // Log the incoming request data
            Log::info('Data received from frontend:', $request->all());

            // Find the post by ID
            $post = Post::find($id);

            if (!$post) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }

            // Validate the request data
            $validatedData = $request->validate([
                'title' => 'sometimes|string|max:255',
                'content' => 'sometimes|string',
                'user_id' => 'sometimes|exists:users,id', // Ensure the user exists
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image input
            ]);

            // Log the validated data
            Log::info('Validated data:', $validatedData);

            // Handle image upload if a new image is provided
            if ($request->hasFile('image')) {
                Log::info('New image file received:', [
                    'file_name' => $request->file('image')->getClientOriginalName(),
                    'file_size' => $request->file('image')->getSize(),
                    'file_mime_type' => $request->file('image')->getMimeType(),
                ]);

                // Delete the old image if it exists
                if ($post->image) {
                    $oldImagePath = str_replace(Storage::disk('public')->url(''), '', $post->image);
                    Storage::disk('public')->delete($oldImagePath);
                }

                // Store the new image
                $imagePath = $request->file('image')->store('posts', 'public');
                $validatedData['image'] = Storage::disk('public')->url($imagePath);

                // Log the new image path
                Log::info('New image uploaded:', ['image_path' => $validatedData['image']]);
            }

            // Update the post
            $post->update($validatedData);

            // Log the updated post
            Log::info('Post updated:', $post->toArray());

            return response()->json([
                'message' => 'Post updated successfully',
                'post' => $post,
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
            Log::error('Error updating post: ' . $e->getMessage());

            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong while updating the post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    // Delete a post
    public function destroy($id)
    {
        try {
            // Find the post by ID
            $post = Post::find($id);

            if (!$post) {
                return response()->json([
                    'message' => 'Post not found',
                ], 404);
            }

            // Delete the post
            $post->delete();

            // Log the deleted post
            Log::info('Post deleted:', $post->toArray());

            return response()->json([
                'message' => 'Post deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error('Error deleting post: ' . $e->getMessage());

            // Handle other exceptions (e.g., database errors)
            return response()->json([
                'message' => 'Something went wrong while deleting the post.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}