import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import img7 from '../assets/7.png';



function Home() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div>
            <NavBar />
            <div className="container justify-center mx-auto shadow-2xl xl:max-w-screen-xl">
                <div className="hero min-h-screen bg-home-img1">
                    <div className="hero-overlay bg-opacity-10"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className=" mb-16 text-4xl text-black font-bold"><FormattedMessage id="La Mejor Manera de Empezar a Construir Riqueza" /></h1>
                            <button className="btn btn-primary rounded-lg text-white" onClick={handleLogin}><FormattedMessage id="Empezar Ahora" /></button>
                        </div>
                    </div>
                </div>
                <div className='bg-[#030A1C] text-white'>
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
                    <h1 className="text-4xl font-bold text-black w-3/4 max-w-96 text-center mt-20"><FormattedMessage id="No importa si tienes poco dinero para invertir..." /></h1>
                    <h1 className="text-4xl font-bold text-black w-3/4 max-w-96 text-center mt-12"><FormattedMessage id="¡En Invictum, todos son bienvenidos!" /></h1>
                </div>
                <div className='bg-[#030A1C] text-white justify-center flex flex-col'>
                    <h1 className="text-4xl font-bold text-center mt-16"><FormattedMessage id="Sobre Nosotros" /></h1>
                    <h1 className="text-2xl font-bold mt-12 ml-16"><FormattedMessage id="¿Qué hacemos?" /></h1>
                    <div className="container px-2 flex flex-row justify-center">
                        <p className="text-base my-4 ml-16 mr-12"><FormattedMessage id="En Invictum, estamos eliminando las barreras tradicionales al
                            mundo de las inversiones. Proporcionamos a la clase media y a los adultos jóvenes la oportunidad de acceder a
                            servicios de construcción y gestión de riqueza profesionales a través de nuestra plataforma digital." /> </p>
                        <img className=" h-24 mx-auto mr-12 my-4" src={img7} alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-bold mt-12 ml-16"><FormattedMessage id="Nuestra Historia" /></h1>
                    <div className="container px-2 flex flex-row justify-center">
                        <p className="text-base my-4 ml-16 mr-12"><FormattedMessage id="Invictum se fundó con la visión de poner las oportunidades de inversión
                            al alcance de todas las personas, independientemente de su estatus social o edad. Creemos en el poder de la tecnología
                            para transformar la industria de la inversión y esa creencia es lo que nos impulsa todos los días." /> </p>
                        <img className=" h-24 mx-auto mr-12 my-4" src={img5} alt="Logo" />
                    </div>
                    <h1 className="text-2xl font-bold mt-12 ml-16"><FormattedMessage id="Nuestra Visión" /></h1>
                    <div className="container px-2 flex flex-row justify-center">
                        <p className="text-base my-4 ml-16 mr-12"><FormattedMessage id="Nuestra visión es convertirnos en la firma de capital riesgo líder en el mundo.
                            Queremos capacitar a las personas para que inviertan en su futuro y hagan realidad sus sueños." /> </p>
                        <img className=" h-24 mx-auto mr-12 my-4" src={img6} alt="Logo" />
                    </div>
                </div>
            </div>
            <Footer className="fixed bottom-0" />
        </div>
    );
}

export default Home;