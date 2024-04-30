import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
  

const ConfirmacionRetiro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, balance, email, password, name, role } = location.state || { amount: 0, balance: 0, email: "", password: "", name: "", role: true};
  
  const [calculatedBalance, setCalculatedBalance] = useState();

  useEffect(() => {
    const calcularBalance = () => {
      const cantidadNumerica = parseFloat(amount);
      if (!balance || !cantidadNumerica) {
        return 91; 
      }
      return parseFloat(balance) - cantidadNumerica;
    };

    setCalculatedBalance(calcularBalance());
  }, [balance, amount]);
  
  const handleReturn = () => {
    navigate('/homeLogin', { state: { email: email, password: password, name: name, role: role } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          <FormattedMessage id="retirar.confirmacion.titulo" defaultMessage="Withdrawal confirmed!" />
        </h1>
        <p className="text-lg mb-8">
          <FormattedMessage id="retirar.confirmacion.mensaje" defaultMessage="Your withdrawal has been successfully confirmed." />
        </p>
        <p className="text-lg mb-8 font-bold"> 
          <FormattedMessage id="confirmacionDeposito.balance" defaultMessage="Your current balance is: "/>{calculatedBalance}
        </p>
        <button
          onClick={handleReturn}
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
        >
          <FormattedMessage id="formulario.confirmacion.volver" defaultMessage="Go to homepage." />
        </button>
      </div>
    </div>
  );
};

export default ConfirmacionRetiro;