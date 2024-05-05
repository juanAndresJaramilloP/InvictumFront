import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ConfirmacionDeposito = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, balance, email, password, name, role } = location.state || { amount: 0, balance: 0, email: "", password: "", name: "", role: true };
  const [isLoading, setIsLoading] = useState(true);


  const calcularBalance = () => {
    return parseFloat(balance) + parseFloat(amount);
  };


  useEffect(() => {

    if (balance !== undefined) {
      console.log("cargo balance", balance);
      setIsLoading(false);
    }
  }, [balance]);

  if (isLoading) {
    return <div>loading...</div>;
  }
  const handleReturn = () => {
    navigate('/homeLogin', { state: { email: email, password: password, name: name, role: role } });
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 id='confirmacionDepositoTitle' className="text-4xl font-bold mb-4"> <FormattedMessage id="confirmacionDeposito.titulo" defaultMessage="Deposit confirmed!" /></h1>
        <p id ='confirmacionDepositoDescription' className="text-lg mb-8"> <FormattedMessage id="confirmacionDeposito.mensaje" defaultMessage="Your deposit has been succesfully processed!" /></p>
        <p id='confirmacionDepositoBalance' className="text-lg mb-8 font-bold"> <FormattedMessage id="confirmacionDeposito.balance" defaultMessage="Your balance is: " />{calcularBalance()}</p>
        <button
          id='confirmacionDepositoButton'
          onClick={handleReturn}
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
        >
          <FormattedMessage id="formulario.confirmacion.volver" defaultMessage="Go to homepage" />
        </button>

      </div>
    </div>
  );
};

export default ConfirmacionDeposito;
