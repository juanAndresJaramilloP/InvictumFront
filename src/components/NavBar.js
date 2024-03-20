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
                <img className='h-20' src={logo} alt="Logo" />
                <a className="btn btn-ghost p-0 text-xl" href='/'>NVICTUM</a>
            </div>
            <div className="navbar-end flex mr-8">
                <a className="btn btn-primary rounded-lg " style={{ color: 'white' }} onClick={handleLogin}><FormattedMessage id='Empezar' /></a>
            </div>
        </div>
    );
};

export default NavBar;