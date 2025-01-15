import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api"; // Import the axios instance

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null); // State for the image file
  const [error, setError] = useState(""); // State to handle errors
  const navigate = useNavigate(); // Hook for navigation
  const { id } = useParams(); // Get the user ID from the URL

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/edit/${id}`); // Fetch user data
        const userData = response.data.user; // Access the user object from the response

        // Populate form fields with current user data
        setName(userData.name);
        setEmail(userData.email);
        setGender(userData.gender);
        setPhone(userData.phone);

        // If the user has an image, you can set it in the state (optional)
        // setImage(userData.image); // Uncomment if you want to pre-fill the image

      } catch (err) {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear previous errors
    setError("");
  
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("phone", phone);
    if (image) {
      formData.append("image", image); // Append the image file
    }
  
    // Log the FormData to check if it's populated correctly
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    try {
      // Make the API call to update the user profile
      const response = await api.put(`/users/${id}`, formData, {
        headers: {
          "Content-Type": "application/json", // Set the content type for file upload
        },
      });
  
      // Handle successful update
      console.log("Profile updated successfully:", response.data);
  
      // Redirect to the profile page or dashboard
      // navigate("/profile"); 
      // Redirect to the profile page
    } catch (err) {
      // Handle errors
      if (err.response) {
        // Server responded with an error
        setError(
          err.response.data.message || "Update failed. Please try again."
        );
      } else {
        // Network or other errors
        setError(
          "An error occurred. Please check your connection and try again."
        );
      }
    }
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected file to the state
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
            Update your profile to keep your information current.
          </p>
        </div>
      </div>

      {/* Right Section - Edit Profile Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
            Edit Profile
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className=""  enctype="multipart/form-data">
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
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter a new password"
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
            <div className="mb-3">
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

            {/* Image Upload Input */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-slate-600"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                accept="image/*" // Accept only image files
              />
            </div>

            {/* Update Button */}
            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;