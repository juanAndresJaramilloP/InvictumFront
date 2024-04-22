import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Acordeon from '../AcordeonAprendizaje';
import localeEsMessages from "../../locales/es";
import '@testing-library/jest-dom/extend-expect'; // Importa extend-expect para tener todos los matchers de jest-dom disponibles

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
    render(
      <IntlProvider locale='es'  messages={localeEsMessages}>
        <Acordeon informacion={informacionMock} />
      </IntlProvider>
    );

    const categorias = screen.getAllByRole('checkbox'); 

    expect(categorias[0]).not.toBeChecked();
    expect(categorias[1]).not.toBeChecked();
  });
});

describe('Acordeon Component', () => {
  test('debe cambiar el estado al hacer clic en el checkbox', () => {
    render(
      <IntlProvider locale='es' messages={localeEsMessages}>
        <Acordeon informacion={informacionMock} />
      </IntlProvider>
    );

    const checkboxes = screen.getAllByRole('checkbox');


    checkboxes.forEach((checkbox, index) => {

      expect(checkbox).not.toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
  });
});




