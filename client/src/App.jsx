// import { useEffect, useState } from "react"
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header";




function App() {

return(
  <BrowserRouter>
  <Header />
  <Routes>
    {/* <Route path="/" element={<Recipies />} />
    <Route path="/recipes/:id" element={<RecipeDetail />}/> */}
  </Routes>
  </BrowserRouter>
)
}

export default App