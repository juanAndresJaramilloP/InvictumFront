import logo from '../Invictum.svg'
import profileImage from '../assets/profileImage.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

const NavBarLogin = (props) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    const email = props.email;
    const password = props.password;

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                const user = jsonData.find(obj => obj.email === email);
                console.log(email);
                if (user) {
                    setFullName(user.full_name);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const handleAdminAccount = () => {
        navigate('/administrarCuenta', {
            state: { email: email, password: password }
        });
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
                <a className="btn btn-ghost p-0 text-xl">NVICTUM</a>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href='/Aprendizaje'><FormattedMessage id="navbar.educacion" defaultMessage="Education" /></a></li>
                    <li>
                        <details>
                            <summary><FormattedMessage id="navbar.transacciones" defaultMessage="Transactions" /></summary>
                            <ul className="p-2 text-black w-32">
                                <li><a href='/Depositar'><FormattedMessage id="navbar.depositar" defaultMessage="Deposit funds" /></a></li>
                                <li><a href='/Retirar'><FormattedMessage id="navbar.retirar" defaultMessage="Withdraw funds" /></a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href='/reportes'>Reportes</a></li>
                </ul>
            </div>
            <div className="navbar-end flex mr-8">
                <p className="text-xl mr-4">{fullName}</p>
                <img className='h-20 bg-black rounded-full p-3 mr-4' src={profileImage} alt="Profile Image" onClick={handleAdminAccount} />
            </div>
        </div>
    );
};

export default NavBarLogin;