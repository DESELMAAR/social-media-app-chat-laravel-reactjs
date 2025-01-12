const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 h-screen flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          About Show Chat
        </h1>
        <p className="text-gray-600 mt-2">
          Connecting people, sharing moments, and building communities.
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Introduction Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
            What is Show Chat?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Show Chat is a modern social media platform designed to help you connect with friends, share your favorite moments, and explore the world through the eyes of others. Whether you're sharing photos, videos, or thoughts, Show Chat makes it easy to stay connected and engaged.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              <strong>Real-Time Messaging:</strong> Chat with friends and family instantly.
            </li>
            <li>
              <strong>Photo & Video Sharing:</strong> Share your favorite moments with the world.
            </li>
            <li>
              <strong>Communities & Groups:</strong> Join groups based on your interests and hobbies.
            </li>
            <li>
              <strong>Explore Feed:</strong> Discover new content from people around the globe.
            </li>
            <li>
              <strong>Privacy Controls:</strong> Manage who sees your posts and information.
            </li>
          </ul>
        </div>

        {/* Mission Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At Show Chat, our mission is to create a safe and inclusive space where people can express themselves, connect with others, and build meaningful relationships. We believe in the power of communication and community to bring people closer together.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-indigo-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-indigo-800">Jane Smith</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Team Member"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-indigo-800">Alice Johnson</h3>
              <p className="text-gray-600">Head of Design</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-white p-6 mt-8">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4 text-center">
          Join the Show Chat Community
        </h2>
        <p className="text-gray-700 mb-4 text-center">
          Ready to connect with friends and share your world? Sign up today and start exploring!
        </p>
        <div className="text-center">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;