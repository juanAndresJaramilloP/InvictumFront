import logo from '../Invictum.svg'
import profileImage from '../assets/profileImage.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

const NavBarLogin = (props) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [balance, setBalance] = useState('');
    const [role, setRole] = useState(true);
    const email = props.email;
    const password = props.password;

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData);
                const user = jsonData.find(obj => obj.email === email);
                if (user) {
                    setFullName(user.full_name);
                    setTiempo(user.tiempo);
                    setBalance(user.balance);
                    setRole(user.role);
                }
            })
            .catch(error => console.log(error));
    }, []);

    const handleHome = () => {
        navigate('/homeLogin', {
            state: { email: email, password: password }
        });
    }

    const handleAdminAccount = () => {
        navigate('/administrarCuenta', {
            state: { email: email, password: password }
        });
    }

    const handleChangePassword = () => {
        navigate('/reestablecerContraseña', {
            state: { email: email, password: password }
        });
    }

    const handleDepositFund = () => {
        navigate('/Depositar', {
            state: { email: email }
        });
    }
    const handleWithdrawFund = () => {
        navigate('/Retirar', {
            state: { email: email }
        });
    }

    const handleVerReporte = () => {
        navigate('/reportes', {
            state: { email: email, tiempo: tiempo }
        });
    }
    const handleAprendizaje = () => {
        navigate('/Aprendizaje', {
            state: { email: email }
        });
    }


    return (
        <div className="navbar bg-[#030A1C] text-white">
            <div className="navbar-start ml-8" onClick={handleHome}>
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        <li><a href='/Aprendizaje'><FormattedMessage id="navbar.educacion" defaultMessage="Education" /></a></li>
                        <li>
                            <details>
                                <summary><FormattedMessage id="navbar.transacciones" defaultMessage="Transactions" /></summary>
                                <ul className="p-2 text-black">
                                    <li><a onClick={handleDepositFund}><FormattedMessage id="navbar.depositar" defaultMessage="Deposit funds" /></a></li>
                                    <li><a onClick={handleWithdrawFund}><FormattedMessage id="navbar.retirar" defaultMessage="Withdraw funds" /></a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a onClick={handleVerReporte}>Reportes</a></li>
                    </ul>
                </div>
                <img className='h-20' src={logo} alt="Logo" />
                <a className="btn btn-ghost p-0 text-xl" onClick={handleHome}>NVICTUM</a>
            </div>
            {role && (
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a onClick={handleAprendizaje}><FormattedMessage id="navbar.educacion" defaultMessage="Education" /></a></li>
                        <li>
                            <details>
                                <summary><FormattedMessage id="navbar.transacciones" defaultMessage="Transactions" /></summary>
                                <ul className="p-2 text-black w-32">
                                    <li><a onClick={handleDepositFund}><FormattedMessage id="navbar.depositar" defaultMessage="Deposit funds" /></a></li>
                                    <li><a onClick={handleWithdrawFund}><FormattedMessage id="navbar.retirar" defaultMessage="Withdraw funds" /></a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a onClick={handleVerReporte}>Reportes</a></li>
                    </ul>
                </div>
            )}
         
            <div className="navbar-end flex mr-8">
                <p className="text-xl mr-4">{fullName}</p>
                <details className="dropdown dropdown-end">
                    <summary><img className='h-20 bg-black rounded-full p-3 mr-4' src={profileImage} alt="Profile Image" /></summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li onClick={handleAdminAccount}><a className='text-black'><FormattedMessage id="Configuración de administrador" /></a></li>
                        <li onClick={handleChangePassword}><a className='text-black'><FormattedMessage id="Reestablecer Contraseña" /></a></li>
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default NavBarLogin;