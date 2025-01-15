import { useState, useEffect } from "react";
import api from '../api'; // Import the axios instance
import EditPost from './EditPost'; // Import the EditPost component

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]); // Initialize as an empty array
  const [editingPostId, setEditingPostId] = useState(null); // Track which post is being edited

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      // Ensure the response data is an array
      if (Array.isArray(response.data.posts)) {
        setPosts(response.data.posts);
      } else {
        console.error("Expected an array but got:", response.data.posts);
        setPosts([]); // Set to empty array if data is not in expected format
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]); // Set to empty array on error
    }
  };

  // Function to handle publishing a new post
  const handlePublish = async () => {
    try {
      const response = await api.post('/posts', { text: postContent });
      setPosts([response.data.posts, ...posts]); // Add the new post to the beginning of the list
      setPostContent(""); // Clear the textarea
      setShowForm(false); // Hide the form
    } catch (error) {
      console.error("Failed to publish post:", error);
    }
  };

  // Function to handle updating a post
  const handleUpdate = async (id, updatedText) => {
    try {
      const response = await api.put(`/posts/${id}`, { text: updatedText });
      const updatedPosts = posts.map(post => 
        post.id === id ? response.data : post
      );
      setPosts(updatedPosts);
      setEditingPostId(null); // Stop editing after update
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  // Function to handle deleting a post
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    setPostContent(""); // Clear the textarea
    setShowForm(false); // Hide the form
  };

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col">
      {/* New Post Button */}
      <div className="sticky top-0 z-10 bg-transparent px-4">
        {!showForm && (
          <div className="flex justify-center bg-transparent">
            <button
              onClick={() => setShowForm(true)}
              className="w-28 bg-gradient-to-r from-fuchsia-500 to-purple-700 text-white py-2 rounded-lg transition-colors relative overflow-hidden hover:opacity-90 animate-gradient shadow-lg hover:shadow-xl"
            >
              New Post
            </button>
          </div>
        )}

        {/* New Post Form */}
        {showForm && (
          <div className="bg-slate-950 shadow-md rounded-lg p-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-900 text-slate-300"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCancel}
                className="text-slate-300 text-sm font-semibold transition-colors hover:text-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="text-slate-300 text-sm font-semibold transition-colors hover:text-indigo-500"
              >
                Publish
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Posts Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
        <div className="space-y-6">
          {Array.isArray(posts) && posts.map((post) => (
            <div key={post.id} className="bg-slate-900 shadow-md rounded-lg p-4">
              {/* Post Header */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={"http://127.0.0.1:8000" + (post.user?.image?.slice(16) || "")}
                  alt={`${post.user?.name || "Unknown"}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-300">{post.user?.name || "Unknown"}</p>
                  <p className="text-sm text-slate-300">{post.updated_at?.slice(0, 10) || ""}</p>
                </div>
              </div>

              {/* Render EditPost component if the post is being edited */}
              {editingPostId === post.id ? (
                <EditPost
                  post={post}
                  onUpdate={handleUpdate}
                  onCancel={() => setEditingPostId(null)}
                />
              ) : (
                <>
                  {/* Post Text */}
                  <p className="mb-4 text-slate-300">{post.content}</p>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={"http://127.0.0.1:8000" + (post.image.slice(16) || "")}
                      alt="Post"
                      className="w-full h-auto rounded-lg mb-4"
                    />
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center space-x-4 text-slate-300">
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                      <span>👍</span>
                      <span>{post.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-500">
                      <span>💬</span>
                      <span>{post.comments} Comments</span>
                    </button>
                    <button
                      onClick={() => setEditingPostId(post.id)}
                      className="flex items-center space-x-2 hover:text-green-500"
                    >
                      <span>✏️</span>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center space-x-2 hover:text-red-500"
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;