import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/Home';
import Video from './components/video.js';
import Reporte from './components/Reporte.js';
import ReporteGestor from './components/ReporteGestor.js';
import Login from './components/Login.js';
import CrearCuenta from './components/CrearCuenta.js';
import AcordeonAprendizaje from './components/AcordeonAprendizaje.js'
import DepositForm from './components/DepositForm.js';
import ConfirmacionDeposito from './components/ConfirmacionDeposito.js';
import WithdrawForm from './components/WithdrawForm.js';
import ConfirmacionRetiro from './components/ConfirmacionRetiro.js';
import CambioContrasenia from './components/CambioContrasenia.js';
import HomeLogin from './components/HomeLogin.js';
import AdminCuenta from './components/AdministrarCuenta.js';
import SubirReporte from './components/SubirReporte.js';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    const URL = "http://localhost:3000/api/v1/temas-educativos";
    fetch(URL)
      .then(data => data.json())
      .then(data => {
        // Función para transformar la estructura JSON en un formato manejable
        const transformData = (items) => {
          return items.map(item => {
            if (item.recursos && item.recursos.length) {
              return {
                nombre: item.nombre,
                hijos: item.recursos.map(recurso => ({
                  nombre: recurso.name,
                  link: recurso.url
                }))
              };
            } else {
              return {
                nombre: item.nombre,
                link: item.url ? item.url : undefined
              };
            }
          });
        };
        const transformedData = transformData(data);
        setObjetos(transformedData);
        console.log(transformedData)
      });
  }, []);

  return (
    <div className="App color-gris-fondo">


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Aprendizaje" element={<AcordeonAprendizaje informacion={objetos} />} />
          <Route path="/Aprendizaje/videos/:nombre" element={<Video informacion={objetos} />} />
          <Route path="/Depositar" element={<DepositForm />} />
          <Route path="/Retirar" element={<WithdrawForm/>} />
          <Route path="/crearcuenta" element={<CrearCuenta />} />
          <Route path="/confirmacionDeposito" element={<ConfirmacionDeposito/>} />
          <Route path="/confirmacionRetiro" element={<ConfirmacionRetiro  />} />
          <Route path="/reportes" element={<Reporte />} />
          <Route path="/reportesGestor" element={<ReporteGestor />} />
          <Route path="/subirReporte" element={<SubirReporte />} />
          <Route path="/reestablecerContraseña" element={<CambioContrasenia />}/>
          <Route path="/homeLogin" element={<HomeLogin />}/>
          <Route path="/administrarCuenta" element={<AdminCuenta />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
