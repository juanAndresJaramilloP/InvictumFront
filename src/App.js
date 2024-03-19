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
import AcordeonAprendizaje from './components/AcordeonAprendizaje.js'


function App() {
  var objetos = [
    {
      "nombre": "Basic concepts",
      "hijos": [
        {
          "nombre": "Introduction to Economics",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          "nombre": "Principles of Accounting",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    },
    {
      "nombre": "Investment analysis",
      "hijos": [
        {
          "nombre": "Market Trends",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          "nombre": "Risk Assessment",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    },
    {
      "nombre": "Fixed-income instruments",
      "hijos": [
        {
          "nombre": "Bonds Fundamentals",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          "nombre": "Bond Market Strategies",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    },
    {
      "nombre": "Variable-income instruments",
      "hijos": [
        {
          "nombre": "Stocks and Shares",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          "nombre": "Dividends Analysis",
          "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    }
  ]

  return (
    <div className="App color-gris-fondo">
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/Aprendizaje" element={<AcordeonAprendizaje informacion={objetos} />} />
          <Route path="/Aprendizaje/videos/:nombre" element={<Video informacion={objetos} />} />
          <Route path="/crearcuenta" element={<CrearCuenta />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
