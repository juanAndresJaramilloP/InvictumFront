import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Aqui se importan todos los componentes
import Home from './components/Home';
import NavBar from './components/NavBar';
import Sidemenu from './components/Sidemenu';
import Acordeon from './components/AcordeonAprendizaje.js'
import Video from './components/video.js'
import Reporte from './components/Reporte.js';
import ReporteGestor from './components/ReporteGestor.js';
import Login from './components/Login.js';
import CrearCuenta from './components/CrearCuenta.js';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/crearcuenta" element={<CrearCuenta />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
