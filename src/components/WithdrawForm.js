import React, { useState } from 'react';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBarLogin from './NavBarLogin';
import { useLocation } from 'react-router-dom';


function WithdrawForm() {
  const location = useLocation();
  const { email, password, name, role } = location.state;
  const [id, setId] = useState(0);
  const [balance, setBalance] = useState(0);
  const [newBalance, setNewBalance ] = useState(0);
  const [form, setForm] = useState({
    amount: '',
    cardHolderName: '',
    bankName: '',
    accountId: '',
    cardholder: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const validateUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users/validate', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setId(data.id);
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
    tempErrors.bankName = form.bankName ? '' : <FormattedMessage id="retirar.error.bank" defaultMessage="The bank's name is required." />;
    tempErrors.accountId = /^\d{16}$/.test(form.accountId) ? '' : <FormattedMessage id="retirar.error.account" defaultMessage="Account id is invalid. It should have 16 digits." />;
    tempErrors.cardholder = form.cardholder ? '' : <FormattedMessage id="depositar.error.cardholder" defaultMessage="Cardholder name is required" />;

    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
      const newBalance = balance - parseFloat(form.amount);
      const updateData = {
        nombre: name,
        correo: email,
        contrasena: "12345",
        rol: 1,
        balance: newBalance
      };

      const token = localStorage.getItem('authToken');

      fetch(`http://localhost:3000/api/v1/clientes/${id}`, {
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

      navigate('/confirmacionRetiro', { state: {balance: newBalance } });
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


          <h2 id='withdrawTitle' className="text-3xl font-semibold text-center text-gray-700 font-inter -mt-20"><FormattedMessage id="retirar.titulo" defaultMessage="Withdraw funds" /></h2>

          <div style={{ width: '72px' }}>
          </div>

          <p
            id='withdrawAvailable'
            className="w-full px-4 my-20 py-5 text-xl text-white bg-blue-500 rounded-3xl focus:outline-none color-disponible text-center  rounded-3x1"

          >
            <FormattedMessage id="retirar.disponible" defaultMessage="Available:" /> {balance}
          </p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">

              <label id='withdrawAmountTitle' htmlFor="amount" className="block text-gray-900 text-sm font-medium mt-20">
              <FormattedMessage id="retirar.amount" defaultMessage="Insert withdrawal amount in USD" />
              </label>

              <input
  
                type="number"
                name="amount"
                id='amount'

                value={form.amount}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.amount ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500  mb-3 placeholder-black`}
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
            <div className="mb-4">
              <label id="bankNameTitle" htmlFor="bankName" className="block text-gray-900  text-sm font-medium mt-11 ">
              <FormattedMessage id="retirar.bank" defaultMessage="Your bank's name" />
              </label>

              <input
              id='bankName'
                type="text"
                name="bankName"

                value={form.bankName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.bankName ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
            </div>
            <div className="mb-4">
              <label id="accountIdTitle" htmlFor="accountId" className="block text-gray-900  text-sm font-medium mt-11 ">
              <FormattedMessage id="retirar.account" defaultMessage="Account number" />
              </label>
              <input
              id='accountId'
                type="text"
                name="accountId"
                placeholder=""
                value={form.accountId}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.accountId ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.accountId && <p className="text-red-500 text-xs mt-1">{errors.accountId}</p>}
            </div>
            <div className="mb-6">
              <label id="cardholderNameTitle" htmlFor="cardholderName" className="block text-gray-900  text-sm font-medium mt-11 ">
              <FormattedMessage id="retirar.cardholder" defaultMessage="Cardholder's name" />
              </label>

              <input
              id='cardholderName'
                type="text"
                name="cardholder"

                value={form.cardholder}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 text-gray-900 bg-transparent border-b-2 ${errors.cardholder ? 'border-red-500' : 'border-gray-500'
                  } focus:outline-none focus:border-blue-500 mb-3 placeholder-black`}
              />
              {errors.cardholder && <p className="text-red-500 text-xs mt-1">{errors.cardholder}</p>}
            </div>
            <div className="mb-6">
              <button
                id='withdrawButton'
                type="submit"
                className="w-full px-4 my-20 py-5 text-xl text-white bg-blue-500 rounded-3xl hover:bg-blue-600 focus:outline-none color-pagar"
                style={{ backgroundColor: 'blue' }}
              >
                <FormattedMessage id="retirar" defaultMessage="Withdraw" />
              </button>

            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default WithdrawForm;
