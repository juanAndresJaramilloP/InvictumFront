import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import WithdrawForm from "../WithdrawForm";
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

describe('WithdrawalForm', () => {

  it('updates input field values amount', () => {
    renderWithRouterAndIntl(<WithdrawForm />);
    const amountInput = screen.getByRole('spinbutton', { name: /Ingrese la cantidad a retirar en USD/ });
    fireEvent.change(amountInput, { target: { value: '123' } });
    expect(amountInput).toHaveValue(123);
  });
  it('updates input field values for bank name', () => {
    renderWithRouterAndIntl(<WithdrawForm />);
    const BankNameInput = screen.getByRole('textbox', { name: /Ingrese el nombre de su banco/ });
    fireEvent.change(BankNameInput, { target: { value: 'Bancolombia' } }); 
    expect(BankNameInput).toHaveValue('Bancolombia');
  });
  it('updates input field values for account number', () => {
    renderWithRouterAndIntl(<WithdrawForm />);
    const AccountNumberInput = screen.getByRole('textbox', { name: /Ingrese el numero de cuenta/ });
    fireEvent.change(AccountNumberInput, { target: { value: '1234567890123456' } });
    expect(AccountNumberInput).toHaveValue('1234567890123456');
  });
  
  it('updates input field values for cardholder name', () => {
    renderWithRouterAndIntl(<WithdrawForm />);
    const CardholderInput = screen.getByRole('textbox', { name: /Nombre del titular de la tarjeta/ });
    fireEvent.change(CardholderInput, { target: { value: 'asd' } });
    expect(CardholderInput).toHaveValue('asd');
  });
  
  

  it('validates fields correctly when empty', () => {
    renderWithRouterAndIntl(<WithdrawForm />);
    const submitButton = screen.getByRole('button', { name: /Retirar/ });

    fireEvent.click(submitButton);


    expect(screen.queryByText(/La cantidad es requerida y debe ser un numero./i)).toBeInTheDocument();
    expect(screen.queryByText(/El nombre del banco es obligatorio./i)).toBeInTheDocument();
    expect(screen.queryByText(/El ID de la cuenta es inválido. Debe tener 16 dígitos./i)).toBeInTheDocument();
    expect(screen.queryByText(/El nombre del titular de la tarjeta es requerido./i)).toBeInTheDocument();
    
  });

});
