import React from 'react';
import NavBar from './NavBar';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import pdf from '../assets/reporte1.pdf';
import './Reporte.css'
import pdfIcon from '../assets/pdfIcon.svg';
import { FormattedMessage } from 'react-intl';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const Reporte = () => {
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <NavBar />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label for="my-drawer-2" className="btn btn-neutral drawer-button lg:hidden rounded-lg mt-3"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                    <div className=' p-8 bg-stone-200 mt-4 rounded-lg'>
                        <p>Page {pageNumber} of {numPages}</p>
                        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                            {Array.apply(null, Array(numPages)).map((x, i) => i + 1).map(page => {
                                return (
                                    <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />)
                            })}
                        </Document>
                    </div>
                </div>
                <div className="drawer-side">
                    <label for="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <li><button className="btn btn-ghost"> <img src={pdfIcon} className=' h-6'/><FormattedMessage id="Reporte Patrimonial" /> 2024/02</button></li>
                        <li><button className="btn btn-ghost"> <img src={pdfIcon} className=' h-6'/><FormattedMessage id="Reporte Patrimonial" /> 2024/01</button></li>
                    </ul>
                </div>
            </div>

        </div>

    );
};

export default Reporte;
