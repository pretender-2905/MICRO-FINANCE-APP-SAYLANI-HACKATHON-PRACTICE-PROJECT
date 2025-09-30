// import { useEffect, useState } from "react"
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Headers from "./components/Headers";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { AuthContext } from "./context/AuthContext";
import Cookies from "js-cookie";
import ChangePassword from "./pages/ChangePassword";
import LoanRequestForm from "./pages/LoanRequestForm";
import Slip from "./pages/Slip";



function App() {
const {user} = useContext(AuthContext)

console.log("user=> ", user)
console.log("token=> ", Cookies.get('token'))
return(

  <>
  <Headers />
  <Routes>
    
    <Route path="/"  element={ <LandingPage />}/>
    <Route path="/login"  element={  user ? <Navigate to={"/UserDashboard"} /> :  <Login />}/>
    <Route path="/SignUp"  element={<SignUp />}/>
    <Route path="/AdminDashboard"  element={<AdminDashboard />}/>
    <Route path="/UserDashboard"  element={<UserDashboard />}/>
    <Route path="/ChangePassword"  element={<ChangePassword />}/>
    <Route path="/LoanRequestForm" element={<LoanRequestForm />}/>
    <Route path="/Slip" element={<Slip />}/>
  </Routes>
 </>
)
}
export default App