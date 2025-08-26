// import { useEffect, useState } from "react"
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Headers from "./components/Headers";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";




function App() {

return(

  <BrowserRouter>
  <Headers />
  <Routes>
    <Route path="/"  element={<LandingPage />}/>
    <Route path="/login"  element={<Login />}/>
    <Route path="/SignUp"  element={<SignUp />}/>
    <Route path="/AdminDashboard"  element={<AdminDashboard />}/>
    <Route path="/UserDashboard"  element={<UserDashboard />}/>
  </Routes>
  </BrowserRouter>
)
}
export default App