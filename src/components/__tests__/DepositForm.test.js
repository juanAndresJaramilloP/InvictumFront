import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import DepositForm from "../DepositForm";
import localeEsMessages from "../../locales/es";
import { BrowserRouter } from 'react-router-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
      state: { email: 'mrosencwaig0@unesco.org', password: "aA6AM", name: "Malchy Rosencwaig", role : true}
  })
}));

const renderWithRouterAndIntl = (component, locale = 'es', messages = localeEsMessages) => {
  return {
    ...render(
      <BrowserRouter>
        <IntlProvider locale={locale} messages={messages}>
          {component}
        </IntlProvider>
      </BrowserRouter>
    )
  };
};

describe('DepositForm', () => {

  it('updates input field values amount', () => {
    renderWithRouterAndIntl(<DepositForm />);
    const amountInput = screen.getByRole('spinbutton', { name: /Ingrese la cantidad a depositar en USD/ });
    fireEvent.change(amountInput, { target: { value: '123' } });
    expect(amountInput).toHaveValue(123);
  });
  it('updates input field values for card holder name', () => {
    renderWithRouterAndIntl(<DepositForm />);
    const cardHolderNameInput = screen.getByRole('textbox', { name: /Nombre del titular de la tarjeta/ });
    fireEvent.change(cardHolderNameInput, { target: { value: 'Juan Pérez' } }); 
    expect(cardHolderNameInput).toHaveValue('Juan Pérez');
  });
  it('updates input field values for card number', () => {
    renderWithRouterAndIntl(<DepositForm />);
    const cardNumberInput = screen.getByRole('textbox', { name: /Numero de tarjeta/ });
    fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
    expect(cardNumberInput).toHaveValue('1234567890123456');
  });
  
  it('updates input field values for CSV', () => {
    renderWithRouterAndIntl(<DepositForm />);
    const csvInput = screen.getByRole('spinbutton', { name: /CSV/ });
    fireEvent.change(csvInput, { target: { value: '123' } });
    expect(csvInput).toHaveValue(123);
  });
  
  

  it('validates fields correctly when empty', () => {
    renderWithRouterAndIntl(<DepositForm />);
    const submitButton = screen.getByRole('button', { name: /Pagar/ });

    fireEvent.click(submitButton);


    expect(screen.queryByText(/La cantidad es requerida y debe ser un numero./i)).toBeInTheDocument();
    expect(screen.queryByText(/El nombre del titular de la tarjeta es requerido./i)).toBeInTheDocument();
    expect(screen.queryByText(/El numero de tarjeta es requerido. Debe ser un numero de 16 digitos./i)).toBeInTheDocument();
    expect(screen.queryByText(/El CSV es requerido. Debe ser un numero de 3 digitos./i)).toBeInTheDocument();
    
  });

});
