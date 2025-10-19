// import { useEffect, useState } from "react"
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import Headers from "./components/Headers";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import { AuthContext } from "./context/AuthContext";
import Cookies from "js-cookie";

import Dashboard from "./pages/Dashboard";
import MemberReports from "./pages/MemberReports";



function App() {
const {user} = useContext(AuthContext)

console.log("user=> ", user)
console.log("token=> ", Cookies.get('token'))
return(

  <>
  <Headers />
  <Routes>
    
   
    <Route path="/login"  element={  user ? <Navigate to={"/UserDashboard"} /> :  <Login />}/>
    <Route path="/SignUp"  element={<SignUp />}/>
  
    <Route path="/UserDashboard"  element={<UserDashboard />}/>
   
   
    
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/member/:id" element={<MemberReports />} />
  </Routes>
 </>
)
}
export default App