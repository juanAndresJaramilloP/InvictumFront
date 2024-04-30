import { pdfjs } from 'react-pdf';

export const initializePdfjs = () => {
    if (typeof pdfjs !== 'undefined') {
        pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.min.js';
    }
};
