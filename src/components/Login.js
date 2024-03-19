import React, { useState } from 'react';
import logo from '../Invictum.svg';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        if (email && password) {
            // Valid inputs, proceed with authentication
            console.log('Authentication successful');
        } else {
            // Invalid inputs, show error message
            console.log('Invalid email or password');
        }
    };

    const handleCreateAccount = (e) => {
        const sendEmail = email;
        const sendPassword = password;
        if (email && password) {
            navigate('/crearcuenta', {
                state: { email: sendEmail, password: sendPassword }
            });
            console.log('Authentication successful');
        } else {
            // Invalid inputs, show error message
            console.log('Invalid email or password');
        }
    }

    return (
        <div>
            <div className="flex container justify-center mx-auto my-20">
                <div className="hero min-w-fit bg-base-200 rounded-md lg:max-w-screen-md">
                    <div className="hero-content flex-col lg:flex-row-reverse w-fit">
                        <div className="text-center lg:text-left flex items-center">
                            <img className='h-20' src={logo} alt="Logo" />
                            <h1 className="text-5xl font-bold">NVICTUM</h1>
                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text"><FormattedMessage id="Correo" /></span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="email" className="grow" placeholder="@" value={email} onChange={handleEmailChange} required />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text"><FormattedMessage id="Contraseña" /></span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input type="password" className="grow" value={password} onChange={handlePasswordChange} minlength="5" required />
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary" onClick={handleLogin}><FormattedMessage id="Iniciar Sesión" /></button>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-outline" onClick={handleCreateAccount}><FormattedMessage id="Crear Cuenta" /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;