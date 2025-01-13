import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Layout from "./Layout";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/edit-profile/:id" element={<EditProfilePage />} />

        </Route>

        {/* Redirect to Login for Unknown Routes */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;