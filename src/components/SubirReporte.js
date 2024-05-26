import React, { useState, useEffect } from 'react';
import NavBarLogin from './NavBarLogin';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

const SubirReporte = () => {
    const [clientEmail, setClientEmail] = useState('');
    const [isRoleValid, setIsRoleValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [clientId, setClientId] = useState(null);
    const [managerId, setManagerId] = useState(null);

    const { email, password, name, role } = location.state;

    useEffect(() => {
        validateUser();
    }, []);

    const validateUser = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/validate', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setManagerId(data.id);
        } catch (error) {
            console.log('Error al validar el usuario:', error);
        }
    };

    const handleEmailChange = (e) => {
        setClientEmail(e.target.value);
    }

    const validateEmailFormat = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(clientEmail);
    };

    const validateClient = async (e) => {
        e.preventDefault();
        if (clientEmail && validateEmailFormat()) {
            const token = localStorage.getItem('authToken');
            try {
                const response = await fetch('http://localhost:3000/api/v1/clientes', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const jsonData = await response.json();
                const user = jsonData.find(obj => obj.correo === clientEmail);
                if (user) {
                    setIsRoleValid(user.rol);
                    setIsEmailValid(true);
                    setClientId(user.id);
                } else {
                    setIsRoleValid(false);
                    setIsEmailValid(false);
                    setClientId(null);
                }
            } catch (error) {
                console.log(error);
                setIsRoleValid(false);
                setIsEmailValid(false);
                setClientId(null);
            }
        } else {
            setIsEmailValid(false);
            setIsRoleValid(false);
            setClientId(null);
        }
    }

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Por favor, selecciona un archivo');
            return;
        }

        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('titulo', title);
        formData.append('archivo', 'reporte gestor');

        try {
            const response = await fetch('http://localhost:3000/api/v1/reportes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const reportData = await response.json();
                const reportId = reportData.id;
                await linkReportToClient(clientId, reportId, token);
                await linkReportToManager(managerId, reportId, token);
                alert('Archivo subido con éxito');
            } else {
                const errorData = await response.json();
                console.log('Error:', errorData);
                alert('Error al subir el archivo');
            }
        } catch (error) {
            console.log(error);
            alert('Error al subir el archivo');
        }
    }

    const linkReportToClient = async (clientId, reportId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/clientes/${clientId}/reportes/${reportId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error:', errorData);
                alert('Error al vincular el reporte con el cliente');
            }
        } catch (error) {
            console.log(error);
            alert('Error al vincular el reporte con el cliente');
        }
    }

    const linkReportToManager = async (managerId, reportId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/gestores/${managerId}/reportes/${reportId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error:', errorData);
                alert('Error al vincular el reporte con el gestor');
            }
        } catch (error) {
            console.log(error);
            alert('Error al vincular el reporte con el gestor');
        }
    }

    return (
        <div>
            <NavBarLogin email={email} password={password} name={name} role={role} />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center mb-80">
                    <div className="max-w-xl">
                        <h1 id="subirReporteTitle" className="text-3xl sm:text-5xl font-bold"><FormattedMessage id='Bienvenido' />, {name}</h1>
                        <p id="subirReporteTexto" className="py-6 sm:text-lg text-base"><FormattedMessage id="SubirReporte" /></p>
                        <div className="flex justify-center items-center">
                            <div className="card shrink-0 w-full max-w-fit shadow-2xl bg-base-100">
                                <form className="card-body">
                                    <div className="flex flex-col lg:flex-row justify-center items-center">
                                        <label id="campoCompleto" className="input input-bordered flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                            <input id="campo" type="email" className="grow" placeholder="myclient@email.com" value={clientEmail} onChange={handleEmailChange} required />
                                        </label>
                                        <button id="campoButton" className="btn mt-2 lg:mt-0 lg:ml-1 btn-primary" onClick={validateClient}><FormattedMessage id="BuscarCliente" /></button>
                                    </div>
                                    {!isEmailValid ? <p id="correoInvalido" className="text-red-500"><FormattedMessage id='CorreoInvalido' /></p> : null}
                                    <div className="form-control mt-6">
                                        {isRoleValid ? (
                                            <div className='flex flex-col justify-center items-center'>
                                                <input id="campoTitulo" type="text" placeholder="Title" data-testid="TituloEnabled" className="input input-bordered w-full max-w-xs mb-2" required onChange={(e) => setTitle(e.target.value)} />
                                                <input id="campoArchivo" type="file" placeholder="pdf" data-testid="PdfEnabled" accept='application/pdf' className="file-input file-input-bordered w-full max-w-xs" required onChange={(e) => setFile(e.target.files[0])} />
                                                <button id="submitFile" className="btn mt-7 max-w-fit" data-testid="BtnEnabled" onClick={handleFileUpload}><FormattedMessage id="subirArchivo" /></button>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col justify-center items-center'>
                                                <input id="campoTitulo" type="text" placeholder="Title" className="input input-bordered w-full max-w-xs mb-2" required disabled />
                                                <input type="file" placeholder="pdf" accept='application/pdf' className="file-input file-input-bordered w-full max-w-xs" required disabled />
                                                <button id="submitFile" className="btn mt-7 max-w-fit" disabled="disabled"><FormattedMessage id='subirArchivo' /></button>
                                            </div>
                                        )}
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

export default SubirReporte;
