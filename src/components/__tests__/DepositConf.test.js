import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmacionDeposito from '../ConfirmacionDeposito'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from '../../locales/es';


const renderWithRouterAndIntl = (component, { state = {} } = {}) => {
  window.history.pushState({}, 'Test page', `/?amount=${state.amount || ''}&balance=${state.balance || ''}`);

  return render(
    <Router>
      <IntlProvider locale="es" messages={localeEsMessages}>
        {component}
      </IntlProvider>
    </Router>
  );
};

describe('ConfirmacionDeposito Component', () => {
  test('renders the balance and messages after loading', async () => {
    const { getByText } = renderWithRouterAndIntl(
      <ConfirmacionDeposito />
   
    );

    await waitFor(() => {
      expect(getByText(/Deposito confirmado!/i)).toBeInTheDocument();
      expect(getByText(/Su deposito ha sido procesado correctamente./i)).toBeInTheDocument();
      expect(getByText(`Su balance actual es: 0`)).toBeInTheDocument(); 
    });
  });

  test('navigates to homepage on link click', async () => {
    const { getByText } = renderWithRouterAndIntl(<ConfirmacionDeposito />);
    const homeLink = getByText(/Volver a la pagina de inicio/i);
    fireEvent.click(homeLink);

    expect(window.location.pathname).toEqual('/homeLogin');
  });
});
