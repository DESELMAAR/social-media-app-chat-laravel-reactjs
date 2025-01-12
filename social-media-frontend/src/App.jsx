import { useState } from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contacts";
import Layout from "./Layout";
import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
