import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmacionDeposito = () => {
 
  const {fullName, balance} = location.state;

  let { cantidad } = useParams();


  const calcularBalance = () => {
    if (balance === undefined) {
      return parseFloat(cantidad);
    }
    return parseFloat(balance) + parseFloat(cantidad);

  };


  


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4"> <FormattedMessage id="confirmacionDeposito.titulo" defaultMessage="Deposit confirmed!" /></h1>
        <p className="text-lg mb-8"> <FormattedMessage id="confirmacionDeposito.mensaje" defaultMessage="Your deposit has been succesfully processed!" /></p>
        <p className="text-lg mb-8 font-bold"> <FormattedMessage id="confirmacionDeposito.balance" defaultMessage="Your balance is: "/>{calcularBalance()}</p>
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
