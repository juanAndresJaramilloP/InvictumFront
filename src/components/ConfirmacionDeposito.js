import React from 'react';
import { FormattedMessage } from 'react-intl';

const ConfirmacionDeposito = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4"> <FormattedMessage id="confirmacionDeposito.titulo" defaultMessage="Deposit confirmed!" /></h1>
        <p className="text-lg mb-8"> <FormattedMessage id="confirmacionDeposito.mensaje" defaultMessage="Your deposit has been succesfully processed!" />.</p>
        <a
          href="/"
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
        >
           <FormattedMessage id="formulario.confirmacion.volver" defaultMessage="Go to homepage" />
        </a>
      </div>
    </div>
  );
};

export default ConfirmacionDeposito;
