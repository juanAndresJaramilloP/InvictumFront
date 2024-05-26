import React, { useState, useEffect } from 'react';
import NavBarLogin from './NavBarLogin';
import PDFViewer from 'tailwind-pdf-viewer';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import './Reporte.css';
import pdfIcon from '../assets/pdfIcon.svg';

const ReporteGestor = () => {
    const [reportes, setReportes] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const location = useLocation();
    const { email, password, name, role } = location.state;
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        validateUser();
    }, [token]);

    const validateUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/users/validate', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            fetchReportes(data.id);
        } catch (error) {
            console.error('Error validating user:', error);
        }
    };

    const fetchReportes = async (managerId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/gestores/${managerId}/reportes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const reportesConTitulos = await Promise.all(data.map(async (reporte) => {
                const titulo = await fetchReporteTitulo(reporte.id);
                return { ...reporte, titulo };
            }));
            setReportes(reportesConTitulos);
            if (data.length > 0) {
                fetchReportePdf(data[data.length - 1].id);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const fetchReporteTitulo = async (reportId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/reportes/titulo/${reportId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.titulo;
        } catch (error) {
            console.error('Error fetching report title:', error);
            return 'Sin título';
        }
    };

    const fetchReportePdf = async (reportId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/reportes/pdf/${reportId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const pdfBlob = await response.blob();
            const pdfURL = URL.createObjectURL(pdfBlob);
            setSelectedPdf(pdfURL);
        } catch (error) {
            console.error('Error fetching report PDF:', error);
        }
    };

    const renderizarReportes = () => {
        return reportes.map((reporte) => (
            <li key={reporte.id}>
                <button onClick={() => fetchReportePdf(reporte.id)} className="btn btn-ghost">
                    <img src={pdfIcon} className='h-6' alt="PDF Icon" />
                    <FormattedMessage id="Reporte Patrimonial" /> {reporte.titulo}
                </button>
            </li>
        ));
    };

    return (
        <div>
            <NavBarLogin email={email} password={password} name={name} role={role} />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center" role="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-neutral drawer-button lg:hidden rounded-lg mt-3">
                        <svg id="boton" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <div id="PDFV" className='p-8 bg-stone-200 mt-4 rounded-lg'>
                        {selectedPdf && <PDFViewer className="pdf-viewer" pdfURL={selectedPdf} />}
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {renderizarReportes()}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ReporteGestor;
