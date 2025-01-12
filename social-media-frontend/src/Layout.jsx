import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Layout = () => {
  // Simulated online users data
  const onlineUsers = [
    {
      id: 1,
      name: "Alice",
      profilePic: "https://via.placeholder.com/40",
      status: "online",
    },
    {
      id: 2,
      name: "Bob",
      profilePic: "https://via.placeholder.com/40",
      status: "online",
    },
    {
      id: 3,
      name: "Charlie",
      profilePic: "https://via.placeholder.com/40",
      status: "away",
    },
    {
      id: 4,
      name: "Diana",
      profilePic: "https://via.placeholder.com/40",
      status: "online",
    },
    {
      id: 5,
      name: "Eve",
      profilePic: "https://via.placeholder.com/40",
      status: "offline",
    },
  ];

  // Simulated connected user profile data
  const connectedUser = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/100",
    bio: "Frontend Developer | React Enthusiast",
    email: "john.doe@example.com",
  };

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Header */}
      <header className="bg-indigo-950 text-indigo-100 p-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row px-4 justify-between items-center">
            <motion.h1
              className="text-2xl font-bold flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Chat Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>

              {/* Logo Text */}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Show Chat
              </span>
            </motion.h1>
            <nav className="mt-4 sm:mt-0">
              <ul className="flex flex-col sm:flex-row gap-4">
                <li>
                  <a href="/" className="hover:text-indigo-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-indigo-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-indigo-300">
                    Contact
                  </a>
                </li>
                <li>
                  <Link to="/login" className="hover:text-slate-300">
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4 text-gray-900 overflow-y-auto">
        <div className="h-full grid grid-cols-[15%,1fr,15%] gap-4">
          {/* Left Section - Profile Info */}
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Profile</h2>

              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                  src={connectedUser.profilePic}
                  alt={connectedUser.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
              </div>

              {/* User Name */}
              <p className="text-center font-semibold text-xl mb-2">
                {connectedUser.name}
              </p>

              {/* Bio */}
              <p className="text-center text-gray-600 mb-4">
                {connectedUser.bio}
              </p>

              {/* Email */}
              <p className="text-center text-gray-600 mb-4">
                {connectedUser.email}
              </p>

              {/* Edit Profile Button */}
              <button className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                Edit Profile
              </button>

              {/* Logout Button */}
              <button className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors">
                Logout
              </button>
            </div>
          </div>

          {/* Outlet (Main Content) */}
          <div className="p-4 rounded-lg overflow-y-auto">
            <Outlet />
          </div>

          {/* Right Section - Online Users */}
          <div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Online Users</h2>

              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search users..."
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {/* Online Users List */}
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    {/* Profile Picture */}
                    <div className="relative">
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {/* Online Status Indicator */}
                      {user.status === "online" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                      {user.status === "away" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 border-2 border-white rounded-full"></span>
                      )}
                      {user.status === "offline" && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-white rounded-full"></span>
                      )}
                    </div>

                    {/* User Name and Status */}
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {user.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 My App</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;