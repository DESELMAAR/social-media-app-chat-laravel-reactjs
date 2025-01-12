import { useState } from "react";

const Home = () => {
  // State to manage the visibility of the new post form
  const [showForm, setShowForm] = useState(false);

  // State to manage the content of the new post
  const [postContent, setPostContent] = useState("");

  // Static posts data
  const posts = [
    {
      id: 1,
      username: "user1",
      profilePic: "https://via.placeholder.com/40",
      text: "This is the first post. Enjoying the day! 🌞",
      image: "https://via.placeholder.com/600x400",
      likes: 10,
      comments: 2,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      username: "user2",
      profilePic: "https://via.placeholder.com/40",
      text: "Just finished a great workout! 💪",
      image: "https://via.placeholder.com/600x400",
      likes: 25,
      comments: 5,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      username: "user3",
      profilePic: "https://via.placeholder.com/40",
      text: "Exploring new places. Travel is life! ✈️",
      image: "https://via.placeholder.com/600x400",
      likes: 50,
      comments: 10,
      timestamp: "1 day ago",
    },
    // Add more posts as needed
  ];

  // Handle form submission
  const handlePublish = () => {
    alert(`New post published: ${postContent}`);
    setPostContent(""); // Clear the textarea
    setShowForm(false); // Hide the form
  };

  // Handle form cancellation
  const handleCancel = () => {
    setPostContent(""); // Clear the textarea
    setShowForm(false); // Hide the form
  };

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col">
      {/* New Post Button */}
      <div className="sticky top-0 z-10 py-4">
        {!showForm && (
          <div className="flex justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="w-28 bg-fuchsia-800 opacity-40 hover:opacity-80 text-white py-2 rounded-lg transition-colors"
            >
              New Post
            </button>
          </div>
        )}

        {/* New Post Form */}
        {showForm && (
          <div className="bg-white shadow-md rounded-lg p-4">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={handleCancel}
                className="text-blue-600 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className="text-indigo-950 text-sm font-semibold transition-colors"
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
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
              {/* Post Header */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={post.profilePic}
                  alt={`${post.username}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.username}</p>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Text */}
              <p className="mb-4">{post.text}</p>

              {/* Post Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}

              {/* Post Actions */}
              <div className="flex items-center space-x-4 text-gray-600">
                <button className="flex items-center space-x-2 hover:text-blue-500">
                  <span>👍</span>
                  <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-blue-500">
                  <span>💬</span>
                  <span>{post.comments} Comments</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;