import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
import Login from '../Login';

const message = localeEsMessages;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('Login component', () => {
    test('renders login form', () => {
        render(
            <BrowserRouter>
                <IntlProvider locale="es" messages={message}>
                    <Login />
                </IntlProvider>
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('@')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('login')).toBeInTheDocument();
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
        expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    });

    test('succesfully logs in a user that exists', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        render(
            <BrowserRouter>
                <IntlProvider locale="es" messages={message}>
                    <Login />
                </IntlProvider>
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('@'), {
            target: { value: 'mrosencwaig0@unesco.org' },
        });
        fireEvent.change(screen.getByTestId('password'), {
            target: { value: 'aA6AM' },
        });

        fireEvent.click(screen.getByTestId('login'));

        setTimeout(() => {
            expect(navigate).toHaveBeenCalledWith('/homeLogin');
        }, 2000);
    });

    test('submitting form with invalid email and password shows error message', async () => {
        render(
            <BrowserRouter>
                <IntlProvider locale="es" messages={message}>
                    <Login />
                </IntlProvider>
            </BrowserRouter>
        );
        const emailInput = screen.getByPlaceholderText('@');
        const passwordInput = screen.getByTestId('password');
        fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
        const loginButton = screen.getByTestId('login');
        fireEvent.click(loginButton);
        setTimeout(() => {
            expect(screen.getByText('Correo o contraseña inválidos')).toBeInTheDocument();
        }, 2000);
    });

    test('clicking create account button navigates to create account page', () => {
        render(
            <BrowserRouter>
                <IntlProvider locale="es" messages={message}>
                    <Login />
                </IntlProvider>
            </BrowserRouter>
        );
        const createAccountButton = screen.getByText('Crear Cuenta');
        fireEvent.click(createAccountButton);
        setTimeout(() => {
            expect(navigate).toHaveBeenCalledWith('/crearcuenta');
        }, 2000);
    });

});
