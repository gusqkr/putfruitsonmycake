import { useEffect, useState } from "react";
import {initializeApp} from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./Home";   
import Login from "./Login";
import Cake from "./Cake";
import Paper from "./Paper";
import Deco from "./Deco";
import Flavor from "./Flavor";
import Birth from "./Birth";


function App() {
  
return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cake" element={<Cake />} />
      <Route path="/Paper" element={<Paper />} />
      <Route path="/Deco" element={<Deco />} />
      <Route path="/flavor" element={<Flavor />} />
      <Route path="/birth" element={<Birth />} />
    </Routes>
  
  </BrowserRouter>
  
);
}
export default App;