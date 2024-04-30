import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReporteGestor from '../ReporteGestor';
import {BrowserRouter as Router} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import localeEsMessages from "../../locales/es";

const message = localeEsMessages;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

jest.mock('react-pdf', () => ({
    __esModule: true,
    Document: ({ children }) => <div data-testid="document">{children}</div>,
    Page: ({ pageNumber }) => <div key={pageNumber} data-testid={`page-${pageNumber}`}>Page {pageNumber}</div>,
}));

jest.mock('../InitializePdfjs.js', () => ({
    initializePdfjs: jest.fn()
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: { email: 'gkeeffe1@flavors.me', password: "oF9)i)bLA", name:"Georgeanna Keeffe", role: false }
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

describe('Reporte Gestor component', () => {

    test('renders page number and document', () => {
        renderWithRouterAndIntl(<ReporteGestor />)
        expect(screen.getByText('Page 1 of')).toBeInTheDocument();
        expect(screen.getByTestId('document')).toBeInTheDocument();
    });

    test('clicking the drawer toggle opens/closes the drawer', () => {
        renderWithRouterAndIntl(<ReporteGestor />);
        const drawerToggle = screen.getByLabelText('close sidebar');
        const drawerContent = screen.getByRole('drawer-content');
        expect(drawerContent).not.toHaveClass('lg:drawer-open');
        fireEvent.click(drawerToggle);
        expect(drawerContent).toHaveClass('drawer-content');
        fireEvent.click(drawerToggle);
        expect(drawerContent).not.toHaveClass('lg:drawer-open');
    });
});