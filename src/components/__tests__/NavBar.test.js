import { render, screen, waitFor } from '@testing-library/react';
import NavBar from '../NavBar';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";
import NavBarLogin from '../NavBarLogin';
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
        const loginButtonElement = screen.getByRole('link', { id: 'Empezar' });
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





    it('renders navbar if role is true', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ email: 'test@example.com', role: true }])
        }));

        await renderWithRouterAndIntl(<NavBarLogin email="test@example.com" password="password123" />);


        await waitFor(() => expect(fetch).toHaveBeenCalled());

        const educacionLinks = screen.getAllByText('Educacion');
        const depositarFondosLinks = screen.getAllByText('Depositar fondos');
        const retirarFondosLinks = screen.getAllByText('Retirar fondos');
        const reportesLinks = screen.getAllByText('Reportes');

        expect(educacionLinks.length).toBeGreaterThan(0);
        expect(depositarFondosLinks.length).toBeGreaterThan(0);
        expect(retirarFondosLinks.length).toBeGreaterThan(0);
        expect(reportesLinks.length).toBeGreaterThan(0);
    });

    it('does not render navbar if role is false', async () => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve([{ email: 'test@example.com', role: false }])
        }));
    
        await renderWithRouterAndIntl(<NavBarLogin email="test@example.com" password="password123" />);
        await waitFor(() => expect(fetch).toHaveBeenCalled());
    
        const educacionElements = screen.queryAllByText('Educacion');
        const depositarFondosElements = screen.queryAllByText('Depositar fondos');
        const retirarFondosElements = screen.queryAllByText('Retirar fondos');
        const reportesElements = screen.queryAllByText('Reportes');
    
        
        depositarFondosElements.forEach(element => expect(element).not.toBeVisible());
        retirarFondosElements.forEach(element => expect(element).not.toBeVisible());
        reportesElements.forEach(element => expect(element).not.toBeVisible());
        educacionElements.forEach(element => expect(element).not.toBeVisible());
    });
    
    
});
