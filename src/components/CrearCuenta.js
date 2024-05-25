import React, { useState } from 'react';
import logo from '../Invictum.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, password } = location.state;
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name) {
            try {
                const response = await fetch('http://localhost:3000/api/v1/clientes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: name,
                        correo: email,
                        contrasena: password,
                        rol: 1,
                        balance: 0,
                    }),
                });

                if (response.ok) {
                    navigate('/');
                } else {
                    console.log('Failed to create account');
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            console.log('Invalid email or password');
        }
    };

    return (
        <div className="h-screen bg-slate-300 flex justify-center items-center">
            <div className="flex container justify-center mx-auto">
                <div className="hero min-w-fit bg-base-200 rounded-md lg:max-w-screen-md">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left flex items-center">
                            <img className='h-20' src={logo} alt="Logo" />
                            <h1 className="text-5xl font-bold">NVICTUM</h1>
                        </div>
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form className="card-body" onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text"><FormattedMessage id="Nombre y Apellido" /></span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 1 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 1 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input type="text" className="grow" placeholder="Juan Andres Jaramillo" onChange={handleNameChange} required minLength="1" />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text"><FormattedMessage id="Correo" /></span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="email" className="grow" placeholder={email} readOnly />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text"><FormattedMessage id="Contraseña" /></span>
                                    </label>
                                    <label className="input input-bordered flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 1 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 1 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 1 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        <input type="password" className="grow" placeholder={password} readOnly />
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary"><FormattedMessage id="Crear Cuenta" /></button>
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
