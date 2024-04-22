import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Acordeon from '../AcordeonAprendizaje';
import localeEsMessages from "../../locales/es";

const message = localeEsMessages;

const informacionMock = [
  {
    nombre: 'Categoría 1',
    hijos: [
      { nombre: 'Subcategoría 1.1' },
      { nombre: 'Subcategoría 1.2' },
    ],
  },
  {
    nombre: 'Categoría 2',
    hijos: [
      { nombre: 'Subcategoría 2.1' },
      { nombre: 'Subcategoría 2.2' },
    ],
  },
];


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));




describe('Acordeon Component', () => {
  test('debe estar cerrado por defecto', () => {
    render(<IntlProvider locale='es' messages={message}>
            <Acordeon informacion={informacionMock} />
        </IntlProvider>);

    const subcategoria1_1 = screen.queryByText('Subcategoría 1.1'); 
    const subcategoria2_1 = screen.queryByText('Subcategoría 2.1');
    

    expect(subcategoria1_1).not.toBeInTheDocument();
    expect(subcategoria2_1).not.toBeInTheDocument();
    
  });
});

describe('Acordeon Component', () => {
  test('should toggle visibility on click', () => {
    render(
      <IntlProvider locale="es" messages={message}>
        <Acordeon informacion={informacionMock} />
      </IntlProvider>
    );

    expect(screen.queryByText('Subcategoría 1.1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Categoría 1'));

    expect(screen.queryByText('Subcategoría 1.1')).toBeInTheDocument();


    fireEvent.click(screen.getByText('Categoría 1'));

    expect(screen.queryByText('Subcategoría 1.1')).not.toBeInTheDocument();
  });
});