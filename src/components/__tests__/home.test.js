import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
const message = localeEsMessages;
import Home from '../Home';

// // Mock react-intl for testing
// jest.mock('react-intl', () => {
//   const React = require('react');
//   const mockIntl = {
//     formatMessage: ({ defaultMessage }) => defaultMessage, // Mocks the formatMessage function to return the defaultMessage
//   };

//   const FormattedMessage = ({ defaultMessage }) => <span>{defaultMessage}</span>; // Mocks the FormattedMessage component to render the defaultMessage

//   return {
//     ...jest.requireActual('react-intl'),
//     useIntl: () => mockIntl, // Mocks the useIntl hook to return the mockIntl object
//     FormattedMessage, // Expose the mocked FormattedMessage component
//   };
// });


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
