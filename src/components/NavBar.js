import logo from '../Invictum.svg'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const NavBar = () => {

    const handleScrollToOurValue = () => {
        
        const section = document.getElementById('Propuesta Valor');

        if (section) {
            const sectionPosition = section.offsetTop;
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollToAboutUs = () => {

        const section = document.getElementById('Sobre Nosotros');

        if (section) {
            const sectionPosition = section.offsetTop;
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="navbar flex bg-[#030A1C] text-white justify-center mx-auto">
            <div className="navbar-start ml-5">
                <img className='h-20' src={logo} alt="Logo" />
                <a className="btn btn-ghost p-0 text-xl" href='/'>NVICTUM</a>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost hidden sm:block content-center" id='Sobre Nosotros' onClick={handleScrollToAboutUs}><FormattedMessage id="Sobre Nosotros" /></a>
                <a className="btn btn-ghost hidden sm:block content-center" id='Nuestro Valor' onClick={handleScrollToOurValue}><FormattedMessage id="Nuestro Valor" /></a>
            </div>
            <div className="navbar-end mr-5">
                <LoginButton />
                <LogoutButton/>
            </div>
        </div>
    );
};

export default NavBar;