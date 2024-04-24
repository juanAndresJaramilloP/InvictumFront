import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConfirmacionRetiro from '../ConfirmacionRetiro'; 
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

describe('ConfirmacionRetiro Component', () => {
  test('renders the balance and messages after loading', async () => {
    const { getByText } = renderWithRouterAndIntl(
      <ConfirmacionRetiro />
   
    );

    await waitFor(() => {
      expect(getByText(/Retiro confirmado!/i)).toBeInTheDocument();
      expect(getByText(/Su retiro ha sido procesado exitosamente./i)).toBeInTheDocument();
      expect(getByText(`Su balance actual es: 91`)).toBeInTheDocument(); 
    });
  });

  test('navigates to homepage on link click', async () => {
    const { getByText } = renderWithRouterAndIntl(<ConfirmacionRetiro />);
    const homeLink = getByText(/Volver a la pagina de inicio/i);
    fireEvent.click(homeLink);

    expect(window.location.pathname).toEqual('/homeLogin');
  });
});
