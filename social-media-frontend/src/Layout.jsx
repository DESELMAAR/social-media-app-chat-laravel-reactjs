import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Use NavLink instead of Link
import { motion } from "framer-motion";
import { useState, useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
const Layout = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [showRightSection, setShowRightSection] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
    }
  }, [navigate]);

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

  // Logout function
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");

    // Redirect to the login page
    navigate("/login");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-col min-h-screen scroll-smooth overflow-hidden">
      {/* Header - Sticky at the top */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-700 text-white p-2 sticky top-0 z-50">
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
                className="h-8 w-8 text-white"
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
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Show Chat
              </span>
            </motion.h1>
            <nav className="mt-4 sm:mt-0">
              <ul className="flex flex-col sm:flex-row gap-4 items-center">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `relative hover:text-gray-200 transition-colors duration-300 ${
                        isActive ? "border-b-2 border-white" : ""
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `relative hover:text-gray-200 transition-colors duration-300 ${
                        isActive ? "border-b-2 border-white" : ""
                      }`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `relative hover:text-gray-200 transition-colors duration-300 ${
                        isActive ? "border-b-2 border-white" : ""
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                {/* Profile Image with Dropdown */}
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
                    <img
                      src={
                        "http://127.0.0.1:8000" +
                        localStorage.getItem("userimage").slice(16)
                      }
                      alt={localStorage.getItem("username")}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {/* Dropdown Menu with Transition */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out ${
                      showDropdown
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-1 text-gray-900 relative">
        <div className="grid grid-cols-1 md:grid-cols-[20%,1fr,20%] gap-4 h-[calc(100vh-72px)]">
          {/* Left Section - Profile Info (Sticky) */}
          <div
            className={`${
              showLeftSection ? "block" : "hidden"
            } md:block sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide`}
          >
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Profile</h2>

              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                  src={
                    "http://127.0.0.1:8000" +
                    localStorage.getItem("userimage").slice(16)
                  }
                  alt={localStorage.getItem("username")}
                  className="w-16 h-16 rounded-full mb-4"
                />
              </div>

              {/* User Name */}
              <p className="text-center font-semibold text-xl mb-2">
                {localStorage.getItem("username")}
              </p>

              {/* Bio */}
              <p className="text-center text-gray-600 mb-4">
                {connectedUser.bio}
              </p>

              {/* Email */}
              <p className="text-center text-gray-600 mb-4">
                {localStorage.getItem("useremail")}
              </p>

              {/* Edit Profile Button */}
              <Link
                to={`/edit-profile/${localStorage.getItem("userId")}`}
                className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Edit Profile
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Outlet (Main Content) */}
          <div className="p-4 rounded-lg overflow-y-auto bg-gradient-to-r from-orange-600 to-orange-500 bg-opacity-50 backdrop-blur-sm scrollbar-hide">
            <Outlet />
          </div>

          {/* Right Section - Online Users (Sticky) */}
          <div
            className={`${
              showRightSection ? "block" : "hidden"
            } md:block sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide`}
          >
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
                        src={localStorage.getItem("userimage")}
                        alt={localStorage.getItem("username")}
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

        {/* Toggle Buttons for Mobile View */}
        <div className="fixed bottom-4 right-4 flex space-x-2 md:hidden">
          <button
            onClick={() => setShowLeftSection(!showLeftSection)}
            className="bg-indigo-500 text-white p-2 rounded-full"
          >
            {showLeftSection ? "Hide Profile" : "Show Profile"}
          </button>
          <button
            onClick={() => setShowRightSection(!showRightSection)}
            className="bg-green-500 text-white p-2 rounded-full"
          >
            {showRightSection ? "Hide Users" : "Show Users"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Layout;
