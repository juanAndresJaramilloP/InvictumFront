import React, { useState } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import NavBarLogin from './NavBarLogin';
import { useLocation } from 'react-router-dom';

function DepositForm() {
  const location = useLocation();
  const { email, password, name, role } = location.state;
  const [form, setForm] = useState({
    amount: '',
    cardHolderName: '',
    cardNumber: '',
    csv: ''
  });
  const [errors, setErrors] = useState({});
  const [clientId, setClientId] = useState('');
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    const validateUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/validate', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setClientId(data.id);
        getClientBalance(data.id);
      } catch (error) {
        console.error('Error validating user:', error);
      }
    };

    const getClientBalance = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/clientes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching client balance:', error);
      }
    };

    validateUser();
  }, [location.pathname]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};

    tempErrors.amount = form.amount ? '' : <FormattedMessage id="depositar.error.amount" defaultMessage="Amount is required and it must be a number" />;
    tempErrors.cardHolderName = form.cardHolderName ? '' : <FormattedMessage id="depositar.error.cardholder" defaultMessage="Cardholder name is required" />;
    tempErrors.cardNumber = /^\d{16}$/.test(form.cardNumber) ? '' : <FormattedMessage id="depositar.error.cardnumber" defaultMessage="Card number is invalid. It should have 16 digits" />;
    tempErrors.csv = form.csv && /^\d{3}$/.test(form.csv.toString()) ? '' : <FormattedMessage id="depositar.error.csv" defaultMessage="CSV is invalid and must be a 3 digit number" />;

    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
      const newBalance = balance + parseFloat(form.amount);
      const updateData = {
        nombre: name,
        correo: email,
        contrasena: "12345",
        rol: 1,
        balance: newBalance
      };

      const token = localStorage.getItem('authToken');

      fetch(`http://localhost:3000/api/v1/clientes/${clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      navigate('/confirmacionDeposito', { state: { amount: form.amount, balance: newBalance, email: email, id: clientId } });
    } else {
      console.log('Form is invalid');
    }
  };

  const handleReturn = () => {
    navigate('/');
  };


  return (
    <div className="">
      <NavBarLogin email = {email} password={password} name={name} role={role}/>
   
      <button
        onClick={handleReturn}
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-black font-bold py-2 px-4 m-10 color-gris-fondo rounded focus:outline-none focus:shadow-outline"
      >
        <svg className="w-4 h-4 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 15l-5-5 5-5v10zM5 10h10V9H5v1z" />
        </svg>
        <FormattedMessage id="formulario.volver" defaultMessage="Return" />
      </button>


      <div className='flex flex-col items-center justify-center'>
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mt-4 px-4 w-full"></div>


          <h2 id="depositTitle" className="text-3xl font-semibold text-center text-gray-700 font-inter -mt-20"><FormattedMessage id="navbar.depositar" defaultMessage="Deposit funds" /></h2>

          <div style={{ width: '72px' }}>
          </div>


          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">

              <label id="depositAmountTitle" htmlFor="amount" className="block text-gray-900 text-sm font-medium mt-20">
                <FormattedMessage id="depositar.amount" defaultMessage="Insert deposit amount in USD" />
              </label>

              <input
                id="amount"
                type="number"
                name="amount"

                value={form.amount}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.amount ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500  mb-3 placeholder-black`}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
            <div className="mb-4">
              <label id="cardholderTitle" htmlFor="cardholder" className="block text-gray-900  text-sm font-medium mt-11 ">
                <FormattedMessage id="depositar.Cardholder's name" defaultMessage="Cardholder's name" />
              </label>

              <input
                id="cardholder"
                type="text"
                name="cardHolderName"

                value={form.cardHolderName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.cardHolderName ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.cardHolderName && <p className="text-red-500 text-xs mt-1">{errors.cardHolderName}</p>}
            </div>
            <div className="mb-4">
              <label id = "cardnumberTitle" htmlFor="cardnumber" className="block text-gray-900  text-sm font-medium mt-11 ">
                <FormattedMessage id="depositar.Card number" defaultMessage="Card number" />
              </label>
              <input
              id="cardnumber"
                type="text"
                name="cardNumber"
                placeholder=""
                value={form.cardNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="mb-6">
              <label id="csvTitle" htmlFor="csv" className="block text-gray-900  text-sm font-medium mt-11 ">
                <FormattedMessage id="depositar.CSV" defaultMessage="CSV" />
              </label>

              <input
              id="csv"
                type="number"
                name="csv"

                value={form.csv}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.csv ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.csv && <p className="text-red-500 text-xs mt-1">{errors.csv}</p>}
            </div>
            <div className="mb-6">
              <button 
                id='depositButton'
                type="submit"
                className="w-full px-4 my-20 py-5 text-xl text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none color-pagar"
                style={{ backgroundColor: 'blue' }}
              >
                <FormattedMessage id="depositar.pagar" defaultMessage="Pay" />
              </button>

            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default DepositForm;
