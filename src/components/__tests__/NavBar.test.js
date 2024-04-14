import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
const message = localeEsMessages;

describe('NavBar', () => {
    test('renders logo', () => {
        render(
            <IntlProvider locale="es" messages={message}>
                <NavBar />
            </IntlProvider>
        );
        const logoElement = screen.getByAltText('Logo');
        expect(logoElement).toBeInTheDocument();
    });

    test('renders login button', () => {
        render(
            <IntlProvider locale="es" messages={message}>
                <NavBar />
            </IntlProvider>
        );
        const loginButtonElement = screen.getByRole('button', { name: 'Empezar Ahora' });
        expect(loginButtonElement).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        render(
            <IntlProvider locale="es" messages={message}>
                <NavBar />
            </IntlProvider>
        );
        const homeLinkElement = screen.getByRole('link', { name: 'NVICTUM' });
        const valorLinkElement = screen.getByRole('link', { id: 'Nuestro Valor' });
        const nosotrosLinkElement = screen.getByRole('link', { id: 'Sobre Nosotros' });

        expect(homeLinkElement).toBeInTheDocument();
        expect(valorLinkElement).toBeInTheDocument();
        expect(nosotrosLinkElement).toBeInTheDocument();
    });
});
