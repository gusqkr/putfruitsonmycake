import { useEffect, useState } from "react";
import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./Home";   
import Login from "./Login";
import Cake from "./Cake";

function App() {
  
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cake" element={<Cake />} />
    </Routes>
  
  </BrowserRouter>
  
);
}
export default App;