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
import DepositForm from './components/DepositForm.js';
import ConfirmacionDeposito from './components/ConfirmacionDeposito.js';
import WithdrawForm from './components/WithdrawForm.js';
import ConfirmacionRetiro from './components/ConfirmacionRetiro.js';
import HomeLogin from './components/HomeLogin.js';
import NavBarLogin from './components/NavBarLogin.js';

import AdminCuenta from './components/AdministrarCuenta.js';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [objetos, setObjetos] = useState([]);



    useEffect(() => {
    const URL = "https://raw.githubusercontent.com/davidzamora9aSyC/datosAprendizaje/main/aprendizajev2.json";
    fetch(URL)
        .then(data => data.json())
        .then(data => {
            // Función para transformar la estructura JSON en un formato manejable
            const transformData = (items) => {
                return items.map(item => {
                    if (item.hijos && item.hijos.length) {
                        return {
                            nombre: item.nombre,
                            hijos: transformData(item.hijos) // Llamada recursiva para los hijos
                        };
                    } else {
                        // Incluye el manejo del 'link' si está disponible
                        return {
                            nombre: item.nombre,
                            link: item.link ? item.link : undefined,
                            
                        };
                    }
                });
            };

            // Transforma los datos y los establece con setData
            const transformedData = transformData(data);
            setObjetos(transformedData);
        });
}, []);



    


  return (
    <div className="App color-gris-fondo">
      

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/crearcuenta" element={<CrearCuenta />}/>
          <Route path="/Aprendizaje" element={<AcordeonAprendizaje informacion={objetos} />} />
          <Route path="/Aprendizaje/videos/:nombre" element={<Video informacion={objetos} />} />
          <Route path="/Depositar" element={<DepositForm />} />
          <Route path="/Retirar" element={<WithdrawForm />} />
          <Route path="/reportes" element={<Reporte />} />
          <Route path="/reportesGestor" element={<ReporteGestor />} />
          <Route path="/confirmacionDeposito" element={<ConfirmacionDeposito />}/>
          <Route path="/confirmacionRetiro" element={<ConfirmacionRetiro />}/>
          <Route path="/homeLogin" element={<HomeLogin />}/>
          <Route path="/administrarCuenta" element={<AdminCuenta />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
