import React from 'react';
import { FormattedMessage } from 'react-intl';

const ConfirmacionRetiro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4"><FormattedMessage id="retirar.confirmacion.titulo" defaultMessage="Withdawal confirmed!" /></h1>
        <p className="text-lg mb-8"><FormattedMessage id="retirar.confirmacion.mensaje" defaultMessage="Your withdrawal has been succesfully confirmed." /></p>
        <a
          href="/"
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
        >
          <FormattedMessage id="formulario.confirmacion.volver" defaultMessage="Go to homepage." />
        </a>
      </div>
    </div>
  );
};

export default ConfirmacionRetiro;
