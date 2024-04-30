import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
const message = localeEsMessages;
import Home from '../Home';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Home', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <IntlProvider locale="es" messages={message}>
        <Home />
      </IntlProvider>
    );

    expect(getByText('La Mejor Manera de Empezar a Construir Riqueza')).toBeInTheDocument();
  });

});
