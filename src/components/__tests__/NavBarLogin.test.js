import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBarLogin from '../NavBarLogin';
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
    state: { email: 'mrosencwaig0@unesco.org', password: "aA6AM", name: "Malchy Rosencwaig", role: true }
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

describe('NavBarLogin component', () => {
  test('renders with user information', async () => {

    renderWithRouterAndIntl(<NavBarLogin email="mrosencwaig0@unesco.org" password="aA6AM" name="Malchy Rosencwaig" role={true} />);

    expect(screen.getByText('NVICTUM')).toBeInTheDocument();
    expect(screen.getByText('Configuración de administrador')).toBeInTheDocument();
  });

  test('navigates to home page when NVICTUM logo is clicked', async () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

    renderWithRouterAndIntl(<NavBarLogin email="mrosencwaig0@unesco.org" password="aA6AM" name="Malchy Rosencwaig" role={true} />);

    fireEvent.click(screen.getByText('NVICTUM'));
    expect(navigate).toHaveBeenCalledWith('/homeLogin', {
      state: { email: 'mrosencwaig0@unesco.org', password: "aA6AM", name: "Malchy Rosencwaig", role: true }
    });
  });

  test('renders correct navbar when role is true (client)', async () => {

    renderWithRouterAndIntl(<NavBarLogin email="mrosencwaig0@unesco.org" password="aA6AM" name="Malchy Rosencwaig" role={true} />);

    const educacionLinks = screen.getAllByText('Educacion');
    const depositarFondosLinks = screen.getAllByText('Depositar fondos');
    const retirarFondosLinks = screen.getAllByText('Retirar fondos');
    const reportesLinks = screen.getAllByText('Reportes');

    const subirReporte = screen.queryByText("Subir Reporte");
    const reporteGestor = screen.queryByText("Reportes de Gestión");

    expect(educacionLinks.length).toBeGreaterThan(0);
    expect(depositarFondosLinks.length).toBeGreaterThan(0);
    expect(retirarFondosLinks.length).toBeGreaterThan(0);
    expect(reportesLinks.length).toBeGreaterThan(0);

    expect(subirReporte).toBeNull();
    expect(reporteGestor).toBeNull();
  });

  test('renders correct navbar when role is false (fund administrator)', async () => {

    renderWithRouterAndIntl(<NavBarLogin email="mrosencwaig0@unesco.org" password="aA6AM" name="Malchy Rosencwaig" role={false} />);

      const subirReporte = screen.getAllByText("Subir Reporte");
      const reporteGestor = screen.getAllByText("Reportes de Gestión");

      const educacion = screen.queryByText("Educacion");
      const transacciones = screen.queryByText("Transacciones");
      const reportes = screen.queryByText("Reportes");

      expect(subirReporte.length).toBeGreaterThan(0);
      expect(reporteGestor.length).toBeGreaterThan(0);

      expect(educacion).toBeNull();
      expect(transacciones).toBeNull();
      expect(reportes).toBeNull();
  });

});
