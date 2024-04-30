import React from 'react';
import { FormattedMessage } from 'react-intl';
import profileImage from '../assets/profileImage.png';

const AdminCuenta = () => {

    return (
        <div className="flex container justify-center mx-auto my-20 bg-white">
            <div className="hero min-w-fit bg-base-200 rounded-md lg:max-w-screen-md">
                <div className="hero-content flex-col">
                    <div className="text-center flex items-center">
                        <img className='h-20 bg-black rounded-full p-3 mr-4' src={profileImage} alt="Profile Image" />
                        <h1 className="text-2xl font-bold">Juan Andres Jaramillo</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"><FormattedMessage id="Nombre y Apellido" /></span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input type="text" className="grow" placeholder="Juan Andres Jaramillo" required minLength="1" readOnly />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"><FormattedMessage id="Correo" /></span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input type="email" className="grow" placeholder="ppp" readOnly />
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"><FormattedMessage id="Contraseña" /></span>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input type="password" className="grow" placeholder="ppp" readOnly />
                                </label>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover"><FormattedMessage id="Reestablecer Contraseña" /></a>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCuenta;