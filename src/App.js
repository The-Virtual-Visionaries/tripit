import Mainpage from "./authpage/Mainpage";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Itineraries from "./itinerariespage/Itineraries";
import React from "react";
import Login from "./components/Login";
import CreateItinerary from "./createpage/CreateItinerary";
import ActivityRecommender from "./activitypage/ActivityRecommender";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/create" element={<CreateItinerary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/activity" element={<ActivityRecommender />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
