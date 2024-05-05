import React from 'react';
import NavBarLogin from './NavBarLogin';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';
import pdf from '../assets/reporte1.pdf';
import './Reporte.css'
import pdfIcon from '../assets/pdfIcon.svg';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { initializePdfjs } from './InitializePdfjs.js';
import PDFViewer from "tailwind-pdf-viewer";
import "tailwind-pdf-viewer/style.css";



initializePdfjs();
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
// ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js';


const Reporte = () => {

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [antiguedad, setAntiguedad] = useState(0);
    const [balance, setBalance] = useState(0);
    const location = useLocation();

    const {email, password, name, role} = location.state;

    useEffect(() => {
        fetch("/users.json")
            .then((response) => response.json())
            .then((jsonData) => {
                const user = jsonData.find((obj) => obj.email === email && obj.password === password);
                setAntiguedad(user.antiguedad);
                setBalance(user.balance);
            })
            .catch(error => console.log(error));
    }, [email, password]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const renderizarReportes = () => {
        const reportes = [];
        const j = antiguedad;
        for (let i = 0; i < antiguedad; i++) {
        reportes.push(<li id={i} key={i}><button className="btn btn-ghost"> <img src={pdfIcon} className=' h-6' /><FormattedMessage id="Reporte Patrimonial" /> 2024/0{j-i}</button></li>);
        }
        return reportes;
    }
    console.log(email);
    return (
        <div>
            <NavBarLogin email={email} password={password} name={name} role={role} />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center" role="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-neutral drawer-button lg:hidden rounded-lg"><svg id="boton" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                    <div className=' p-4 bg-stone-200 mb-24 rounded-lg'>
                    
                        <div id= "PDFV"  style={{ maxHeight: '72vh', overflow: 'hidden' }}>
                        <PDFViewer className="pdf-viewer" pdfURL={pdf}  />

                        </div>
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

export default Reporte;
