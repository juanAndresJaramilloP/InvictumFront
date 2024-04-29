import React, { useState, useEffect } from 'react';
import logo from '../Invictum.svg';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [data, setData] = useState([]);
    const [isEmailValid, setValidEmail] = useState(true);
    const [isPasswordValid, setValidPassword] = useState(true);

    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.log(error));
    }, []);

    const checkAccount = (emailToCheck, passwordToCheck) => {
        const found = data.some(obj => obj.email === emailToCheck && obj.password === passwordToCheck);
        setValidEmail(found);
        setValidPassword(found);
        return found;
    };


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (data.length === 0) {
            console.log('Data is still fetching...');
            return;
        }

        if (checkAccount(email, password)) {
            navigate('/homeLogin', {
                state: { email: email, password: password }
            });
        }
    };

    const handleCreateAccount = () => {
        const sendEmail = email;
        const sendPassword = password;
        if (email && password.length > 4) {
            navigate('/crearcuenta', {
                state: { email: sendEmail, password: sendPassword }
            });
        }
    }

    return (
        <div className= "h-screen bg-slate-300 flex justify-center items-center">
            <div>
                {!isEmailValid && !isPasswordValid && <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span><FormattedMessage id='Correo o contraseña inválidos'/></span>
                </div>}
                <div className="flex container justify-center mx-auto">
                    <div className="hero w-screen bg-base-200 rounded-md lg:max-w-screen-md">
                        <div className="hero-content flex-col lg:flex-row-reverse">
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
                                            <input type="password" className="grow" value={password} onChange={handlePasswordChange} minLength="5" required />
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary" onClick={handleLogin}><FormattedMessage id="Iniciar Sesión" /></button>
                                        {!isEmailValid && !isPasswordValid && <p className="text-red-500"><FormattedMessage id='Correo o contraseña inválidos'/></p>}
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
        </div>
    );
};

export default Login;