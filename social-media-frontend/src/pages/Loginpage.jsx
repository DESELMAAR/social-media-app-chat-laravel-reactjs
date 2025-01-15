import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Import the axios instance
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(""); // State to handle login errors
  const navigate = useNavigate(); // Hook for navigation

  // Trigger the transition when the component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make a POST request to the login endpoint
      const response = await api.post("/login", {
        email,
        password,
      });
  
      if (response) {
        console.log(response);
      }
  
      // Extract the token, user data, and image URL from the response
      const { token, user } = response.data;
      const userImage = user.image; // Assuming the image URL is in user.image
  
      // Store the token and user data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.name);
      localStorage.setItem("useremail", user.email);
      localStorage.setItem("userId", user.id);
  
      // Store the image URL in localStorage (if available)
      if (userImage) {
        localStorage.setItem("userimage", userImage);
      }
  
      // Display a success toast notification
      toast.success("Login successful! Redirecting...", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          background: "white", // Green background
          color: "purple", // White text
          fontWeight: "bold", // Bold text
          borderRadius: "8px", // Rounded corners
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
        },
      });
  
      // Redirect the user to the dashboard or home page after a delay
      setTimeout(() => {
        navigate("/"); // Change this to your desired route
      }, 3000); // Redirect after 3 seconds
  
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with an error status code (4xx, 5xx)
        setError(err.response.data.message || "Login failed. Please try again.");
        toast.success("Login failed. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "white", // Green background
            color: "red", // White text
            fontWeight: "bold", // Bold text
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
          },
        });
      } else {
        // Something went wrong with the request setup
        setError("An unexpected error occurred. Please try again.");
        toast.success("Login failed. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            background: "white", // Green background
            color: "red", // White text
            fontWeight: "bold", // Bold text
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-950 to-purple-900">
      {/* Left Section - Presentation */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="text-white text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-indigo-400"
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
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Show Chat
            </h1>
          </div>
  
          {/* Tagline */}
          <p className="text-lg text-slate-200 mb-4">
            Connect with friends, share moments, and explore the world.
          </p>
  
          {/* Features List */}
          <ul className="text-left text-slate-300 space-y-2">
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Real-time messaging</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Share photos and videos</span>
            </li>
            <li className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Join communities and groups</span>
            </li>
          </ul>
        </div>
      </div>
  
      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div
          className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-sm transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600 font-bold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-purple-800"
                placeholder="Enter your email"
                required
              />
            </div>
  
            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-purple-800"
                placeholder="Enter your password"
                required
              />
            </div>
  
            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-800 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-bold"
            >
              Login
            </button>
          </form>
  
          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-800 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
  
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;