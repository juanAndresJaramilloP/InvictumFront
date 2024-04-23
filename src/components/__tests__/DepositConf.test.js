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
    const amount = '100';
    const balance = '500';
    const { getByText } = renderWithRouterAndIntl(<ConfirmacionDeposito />, { state: { amount:amount, balance:balance } });

    await waitFor(() => {
      expect(getByText(/Deposit confirmed!/i)).toBeInTheDocument();
      expect(getByText(/Your deposit has been succesfully processed!/i)).toBeInTheDocument();
      expect(getByText(/Your balance is: 600/i)).toBeInTheDocument(); // 500 + 100
    });
  });

  test('calculates new balance correctly', () => {
    const amount = '200';
    const balance = '1500';
    const { getByText } = renderWithRouterAndIntl(<ConfirmacionDeposito />, { state: { amount, balance } });

    expect(getByText(/Your balance is: 1700/i)).toBeInTheDocument(); // 1500 + 200
  });

  test('navigates to homepage on link click', async () => {
    const { getByText } = renderWithRouterAndIntl(<ConfirmacionDeposito />);
    const homeLink = getByText(/Go to homepage/i);
    fireEvent.click(homeLink);

    expect(window.location.pathname).toEqual('/');
  });
});
