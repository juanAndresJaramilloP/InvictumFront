import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubirReporte from '../SubirReporte';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";

const message = localeEsMessages;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: { email: 'test@example.com', password: 12345, name: "Juan Andres" }
    })
}));


const renderWithRouterAndIntl = (component) => {
    return render(
        <Router>
            <IntlProvider locale="es" messages={message}>
                {component}
            </IntlProvider>
        </Router>
    );
};

describe('SubirReporte component', () => {

    test('renders with initial state', () => {

        renderWithRouterAndIntl(<SubirReporte />)

        expect(screen.getByPlaceholderText('myclient@email.com')).toBeInTheDocument();
        expect(screen.getByText('Validar')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Title')).toBeDisabled();
        expect(screen.getByPlaceholderText('pdf')).toBeDisabled();
    });

    test('displays error message for invalid email', async () => {
        renderWithRouterAndIntl(<SubirReporte />)

        fireEvent.click(screen.getByText('Validar'));
        expect(await screen.findByText('Correo inválido')).toBeInTheDocument();
    });

    test('enables form fields when client email is valid', async () => {
        renderWithRouterAndIntl(<SubirReporte />)

        const emailInput = screen.getByPlaceholderText('myclient@email.com');
        fireEvent.change(emailInput, { target: { value: 'njeffcock5@gizmodo.com' } });
        fireEvent.click(screen.getByText('Validar'));
        
        setTimeout(() => {
            expect(screen.getByTestId('TituloEnabled')).toBeEnabled();
            expect(screen.getByTestId('PdfEnabled')).toBeEnabled();
            expect(screen.getByTestId('BtnEnable')).toBeEnabled();
        }, 2000);
        
    });

    test('disables form fields when client role is invalid', async () => {
        renderWithRouterAndIntl(<SubirReporte />)

        const emailInput = screen.getByPlaceholderText('myclient@email.com');
        fireEvent.change(emailInput, { target: { value: 'invalidEmail@example.com' } });
        fireEvent.click(screen.getByText('Validar'));

        expect(await screen.findByPlaceholderText('Title')).toBeDisabled();
        expect(screen.getByPlaceholderText('pdf')).toBeDisabled();
        expect(screen.getByText('Subir Archivo')).toBeDisabled();
    });
});