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
import CambioContrasenia from './components/CambioContrasenia.js';
import HomeLogin from './components/HomeLogin.js';
import NavBarLogin from './components/NavBarLogin.js';

import AdminCuenta from './components/AdministrarCuenta.js';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [objetos, setObjetos] = useState([]);
  const [datos, setDatos] = useState([]);


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

              return {
                nombre: item.nombre,
                link: item.link ? item.link : undefined,

              };
            }
          });
        };
        const transformedData = transformData(data);
        setObjetos(transformedData);
      });
  }, []);


  useEffect(() => {
    const URL = "https://my.api.mockaroo.com/usuarios_sprint1.json?key=1390d7a0";
    fetch(URL)
      .then(data => data.json())
      .then(data => {
    
        const transformData1 = (items) => {
          return items.map(item => {
            if (item.hijos && item.hijos.length) {
              return {
                balance: item.balance,
                email: item.email,
                
              };
            }
            });
        };
        const transformedData =transformData1(data);
        setDatos(transformedData);
        
      });
  }, []);

  const balance = 100;


  return (
    <div className="App color-gris-fondo">


      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Aprendizaje" element={<AcordeonAprendizaje informacion={objetos} />} />
          <Route path="/Aprendizaje/videos/:nombre" element={<Video informacion={objetos} />} />
          <Route path="/Depositar" element={<DepositForm />} />
          <Route path="/Retirar" element={<WithdrawForm balance={balance}/>} />
          <Route path="/crearcuenta" element={<CrearCuenta />} />
          <Route path="/confirmacionDeposito/:cantidad" element={<ConfirmacionDeposito balance={balance}/>} />
          <Route path="/confirmacionRetiro/:cantidad" element={<ConfirmacionRetiro balance={ balance } />} />

      
  

          <Route path="/reportes" element={<Reporte />} />
          <Route path="/reportesGestor" element={<ReporteGestor />} />

 
          <Route path="/reestablecerContraseña" element={<CambioContrasenia />}/>
          <Route path="/homeLogin" element={<HomeLogin />}/>
          <Route path="/administrarCuenta" element={<AdminCuenta />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
