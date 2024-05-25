import React from 'react';
import NavBar from './NavBar';
import NavBarLogin from './NavBarLogin';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';
import { useState } from 'react';
import { useEffect } from 'react';


function Home() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({ email: '', name: '', role: '' });
    const [error, setError] = useState('');
    const password = "";
  
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const validateToken = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/v1/users/validate', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
  
            if (!response.ok) {
              throw new Error('Token validation failed');
            }
  
            const data = await response.json();
            setUserData({
              email: data.username,
              name: data.name,
              role: data.role
            });
          } catch (error) {
            setError(error.message);
            console.error('Error:', error);
            // If token validation fails, redirect to login
            navigate('/login');
          }
        };
  
        validateToken();
      } else {
        // If no token, redirect to login
        navigate('/login');
      }
    }, [navigate]);
  
    const handleLogin = () => {
      navigate('/login');
    }

    return (
        <div>
           <NavBarLogin email={userData.email} password={password} name={userData.name} role={userData.role}/>
            <div className="container justify-center mx-auto shadow-2xl">
                <div className="hero min-h-screen bg-home-img1">
                    <div className="hero-overlay bg-opacity-10"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className=" mb-16 text-4xl text-black font-bold"><FormattedMessage id="La Mejor Manera de Empezar a Construir Riqueza" defaultMessage="La Mejor Manera de Empezar a Construir Riqueza"/></h1>
                            <button className="btn btn-primary rounded-lg text-white mb-80" onClick={handleLogin}><FormattedMessage id="Empezar Ahora" /></button>
                        </div>
                    </div>
                </div>
                <div id='Propuesta Valor' className='bg-[#030A1C] text-white'>
                    <div className=" justify-center items-start flex flex-col sm:flex-row p-10">
                        <div className="container mx-1.5 px-2 flex-col">
                            <img className="h-14 mx-auto" src={img1} alt="Logo" />
                            <h1 className="text-base font-bold text-center my-4"><FormattedMessage id="Genera ingresos de la forma más fácil" /></h1>
                            <h1 className=" text-sm font-bold text-center mb-8"><FormattedMessage id="Tú inviertes y nosotros nos encargamos de manejar tu dinero" /></h1>
                        </div>
                        <div className="container mx-1.5 px-2 flex-col">
                            <img className="h-14 mx-auto" src={img2} alt="Logo" />
                            <h1 className="text-base font-bold text-center my-4"><FormattedMessage id="¡No necesitas montos elevados!" /> </h1>
                            <h1 className=" text-sm font-bold text-center mb-8"><FormattedMessage id="Empieza a invertir poco a poco y tu dinero comenzará a crecer" /></h1>
                        </div>
                        <div className="container mx-1.5 px-2 flex-col">
                            <img className="h-14 mx-auto" src={img3} alt="Logo" />
                            <h1 className="text-base font-bold text-center my-4"><FormattedMessage id="Invierte como tú quieras" /> </h1>
                            <h1 className=" text-sm font-bold text-center mb-8"><FormattedMessage id="Elige en qué quieres invertir y qué tanto riesgo estás dispuesto a asumir" /></h1>
                        </div>
                        <div className="container mx-1.5 px-2 flex-col">
                            <img className="h-14 mx-auto" src={img4} alt="Logo" />
                            <h1 className="text-base font-bold text-center my-4"><FormattedMessage id="Aprende sobre cómo invertir tu dinero" /> </h1>
                            <h1 className=" text-sm font-bold text-center mb-8"><FormattedMessage id="Aprende qué hacen y cómo los hacen los mejores de la industria" /></h1>
                        </div>
                    </div>
                </div>
                <div className=" h-screen bg-cover bg-center bg-home-img2 flex flex-col items-center">
                    <h1 className="text-4xl font-bold text-black w-3/4 max-w-xl text-center mt-20"><FormattedMessage id="No importa si tienes poco dinero para invertir..." /></h1>
                    <h1 className="text-4xl font-bold text-black w-3/4 max-w-xl text-center mt-12"><FormattedMessage id="¡En Invictum, todos son bienvenidos!" /></h1>
                </div>
                <div id='Sobre Nosotros' className='bg-[#030A1C] text-white justify-center flex flex-col'>
                    <h1 className="text-4xl font-bold text-center mt-16"><FormattedMessage id="Sobre Nosotros" /></h1>
                    <div className='container mx-auto mt-14'>
                        <h1 className="text-2xl font-bold text-center my-3"><FormattedMessage id="¿Qué hacemos?" /></h1>
                        <div className="container flex flex-row flex-wrap justify-evenly">
                            <p className="text-base max-w-3xl px-10 lg:px-0 text-center lg:text-justify"><FormattedMessage id="home.quesehace" /> </p>
                            <img className=" h-24  mt-4 lg:mt-0" src={img7} alt="Logo" />
                        </div>
                    </div>
                    <div className='container mx-auto mt-14'>
                        <h1 className="text-2xl font-bold text-center my-3"><FormattedMessage id="Nuestra Historia" /></h1>
                        <div className="container flex flex-row flex-wrap justify-evenly">
                            <p className="text-base max-w-3xl px-10 lg:px-0 text-center lg:text-justify"><FormattedMessage id="home.historia.contenido" /> </p>
                            <img className=" h-24  mt-4 lg:mt-0" src={img5} alt="Logo" />
                        </div>
                    </div>
                    <div className='container mx-auto mt-14 mb-14'>
                        <h1 className="text-2xl font-bold text-center my-3"><FormattedMessage id="Nuestra Visión" /></h1>
                        <div className="container flex flex-row flex-wrap justify-evenly">
                            <p className="text-base max-w-3xl px-10 lg:px-0 text-center lg:text-justify"><FormattedMessage id="home.vision.contenido" /> </p>
                            <img className=" h-24 mt-4 lg:mt-0" src={img6} alt="Logo" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0" />
        </div>
    );
}

export default Home;