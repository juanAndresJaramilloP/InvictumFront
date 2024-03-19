import logo from '../Invictum.svg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    return (
        <div className="navbar bg-[#030A1C] text-white">
            <div className="navbar-start ml-8">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2 text-black">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <img className='h-20' src={logo} alt="Logo" />
                <a className="btn btn-ghost p-0 text-xl" href='/'>NVICTUM</a>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/Aprendizaje'>Educación</a></li>
                    <li>
                        <details>
                            <summary>Transacciones</summary>
                            <ul className="p-2 text-black w-32">
                                <li><a  href='/Depositar'>Depositar fondos</a></li>
                                <li><a  href='/Retirar'>Retirar fondos</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end flex mr-8">
                <a className="btn btn-primary rounded-lg " style={{ color: 'white' }} onClick={handleLogin}><FormattedMessage id='Empezar' /></a>
            </div>
        </div>
    );
};

export default NavBar;