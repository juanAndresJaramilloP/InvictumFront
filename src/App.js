import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import SidePanel from './components/SidePanel';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <NavBar></NavBar>
    <SidePanel></SidePanel>
    <BrowserRouter>
      <Routes>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
