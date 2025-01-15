import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Layout = () => {
  const [showLeftSection, setShowLeftSection] = useState(false);
  const [showRightSection, setShowRightSection] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    navigate("/login");
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="flex flex-col min-h-screen scroll-smooth overflow-hidden">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Show Chat
              </span>
            </motion.h1>
            <nav>
              <ul className="flex items-center gap-4">
                <li>
                  <NavLink
                    to="/" // Redirect to the root path
                    className={({ isActive }) =>
                      `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                {["About", "Contact"].map((page) => (
                  <li key={page}>
                    <NavLink
                      to={`/${page.toLowerCase()}`}
                      className={({ isActive }) =>
                        `hover:text-gray-300 ${isActive ? "border-b-2 border-white" : ""}`
                      }
                    >
                      {page}
                    </NavLink>
                  </li>
                ))}
                <li className="relative">
                  <button onClick={toggleDropdown} className="focus:outline-none">
                    <img
                      src={`http://127.0.0.1:8000${localStorage.getItem("userimage")?.slice(16) || ""}`}
                      alt={localStorage.getItem("username") || "User"}
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-1 text-gray-900 relative">
        <div className="grid grid-cols-1 md:grid-cols-[20%,1fr,20%] gap-4 h-[calc(100vh-72px)]">
          {/* Left Section - Profile Info */}
          <div
            className={`${
              showLeftSection ? "block" : "hidden"
            } md:block sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide`}
          >
            <ProfileSection />
          </div>

          {/* Outlet (Main Content) */}
          <div className="p-4 rounded-lg overflow-y-auto bg-gradient-to-r from-gray-800 to-gray-800 bg-opacity-50 backdrop-blur-sm scrollbar-hide">
            <Outlet />
          </div>

          {/* Right Section - Online Users */}
          <div
            className={`${
              showRightSection ? "block" : "hidden"
            } md:block sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto scrollbar-hide`}
          >
            <OnlineUsersSection />
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

// Profile Section Component
const ProfileSection = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-slate-300 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <div className="flex justify-center">
        <img
          src={`http://127.0.0.1:8000${localStorage.getItem("userimage")?.slice(16) || ""}`}
          alt={localStorage.getItem("username") || "User"}
          className="w-16 h-16 rounded-full mb-4"
        />
      </div>
      <p className="text-center font-semibold text-xl mb-2">
        {localStorage.getItem("username") || "Unknown"}
      </p>
      <p className="text-center text-slate-300 mb-4">
        {localStorage.getItem("useremail") || ""}
      </p>
      <Link
        to={`/edit-profile/${localStorage.getItem("userId")}`}
        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors block text-center"
      >
        Edit Profile
      </Link>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded-lg mt-2 hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

// Online Users Section Component
const OnlineUsersSection = () => {
  const onlineUsers = [
    // Mock data for online users
    { id: 1, name: "User1", status: "online" },
    { id: 2, name: "User2", status: "away" },
    { id: 3, name: "User3", status: "offline" },
  ];

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-slate-300 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Online Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-slate-300"
      />
      <div className="space-y-3">
        {onlineUsers.map((user) => (
          <div key={user.id} className="flex items-center space-x-3">
            <img
              src={`http://127.0.0.1:8000${localStorage.getItem("userimage")?.slice(16) || ""}`}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-slate-300 capitalize">{user.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;