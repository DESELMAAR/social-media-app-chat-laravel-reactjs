import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api"; // Import the axios instance

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Prepare the registration data
    const registrationData = {
      name,
      email,
      password,
      gender,
      phone,
    };

    try {
      // Make the API call to register the user
      const response = await api.post("/register", registrationData);

      // Handle successful registration
      console.log("Registration successful:", response.data);

      // Redirect to the login page or dashboard
      navigate("/login"); // Redirect to the login page
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else {
        // Network or other errors
        setError("An error occurred. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-950 to-purple-900">
      {/* Left Section - Presentation */}
      <div className="w-1/2 flex items-center justify-center p-12">
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

      {/* Right Section - Register Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Register
          </h2>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Gender Input */}
            <div className="mb-3">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-slate-600"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value={0}>Male</option>
                <option value={1}>Female</option>
               
              </select>
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-600"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-slate-800 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;