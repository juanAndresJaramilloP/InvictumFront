import { render, screen, waitFor } from '@testing-library/react';
import NavBar from '../NavBar';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
import { BrowserRouter as Router } from 'react-router-dom';

const message = localeEsMessages;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const renderWithRouterAndIntl = (component) => {
    return render(
        <Router>
            <IntlProvider locale="es" messages={localeEsMessages}>
                {component}
            </IntlProvider>
        </Router>
    );
};

describe('NavBar', () => {
    test('renders logo', () => {
        renderWithRouterAndIntl(<NavBar />);
        const logoElement = screen.getByAltText('Logo');
        expect(logoElement).toBeInTheDocument();
    });

    test('renders login button', () => {
        renderWithRouterAndIntl(<NavBar />);
        const loginButtonElement = screen.getByRole('link', { id: 'Empezar' });
        expect(loginButtonElement).toBeInTheDocument();
    });

    test('renders navigation links', () => {
        renderWithRouterAndIntl(<NavBar />);
        const homeLinkElement = screen.getByRole('link', { name: 'NVICTUM' });
        const valorLinkElement = screen.getByRole('link', { id: 'Nuestro Valor' });
        const nosotrosLinkElement = screen.getByRole('link', { id: 'Sobre Nosotros' });

        expect(homeLinkElement).toBeInTheDocument();
        expect(valorLinkElement).toBeInTheDocument();
        expect(nosotrosLinkElement).toBeInTheDocument();

    });
});
