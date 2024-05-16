import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Chatbot from "../ChatBot/Chatbot";

import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import OTPVerify from "../../pages/OTPVerify/OTPVerify";

import Home from "../../pages/Home/Home";
import About from "../../pages/About/About";
import Contact from "../../pages/Contact/Contact";

import Profile from "../../pages/Profile/Profile";
import ProfilePlaces from "../../pages/ProfilePlaces/ProfilePlaces";
import Bookings from "../../pages/Bookings/Bookings";
import AddProfilePlaces from "../../pages/AddProfilePlaces/AddProfilePlaces";

import Places from "../../pages/Places/Places";
import SinglePlace from "../../pages/SinglePlace/SinglePlace";
import { UserContextProvider } from "../../context/UserContext";

import axios from "axios";

import "./App.css";

export const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const App = () => {

  // Sending Request and Starting Server as soon as website loads
  axios.get(`${BASE_URL}/test`);

  return (
    <div className="app">
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          {/* <Chatbot /> */}
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify/:id" element={<OTPVerify />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/places" element={<ProfilePlaces />} />
              <Route
                path="/profile/places/new"
                element={<AddProfilePlaces />}
              />
              <Route
                path="/profile/places/:id"
                element={<AddProfilePlaces />}
              />
              <Route path="/places/:id" element={<SinglePlace />} />
              <Route path="/profile/bookings" element={<Bookings />} />
              <Route path="/places" element={<Places />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
};

export default App;
