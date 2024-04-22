import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Video from '../video';
import '@testing-library/jest-dom/extend-expect';
import { IdVideo, linkVideo, conseguirData } from "../utils";
import { useParams } from 'react-router-dom';
import VideoPlayer from "../VideoPlayer";
import localeEsMessages from "../../locales/es";



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



describe('IdVideo', () => {
  test('debe extraer correctamente el ID de un enlace de YouTube', () => {
    const url = "https://www.youtube.com/watch?v=abcdefg1234";
    expect(IdVideo(url)).toBe('abcdefg1234');
  });

  test('debe retornar null si el enlace no es válido', () => {
    const url = "https://www.someotherwebsite.com/watch?v=abcdefg1234";
    expect(IdVideo(url)).toBeNull();
  });
});

describe('linkVideo', () => {
  const data = [
    { hijos: [{ nombre: 'Video1', link: 'https://youtu.be/abcdefg1234' }] },
    { hijos: [{ nombre: 'Video2', link: 'https://youtu.be/hijklmn5678' }] }
  ];

  test('debe encontrar el enlace correcto por nombre', () => {
    expect(linkVideo(data, 'Video1')).toBe('https://youtu.be/abcdefg1234');
  });

  test('debe retornar null si no se encuentra el nombre', () => {
    expect(linkVideo(data, 'Video3')).toBeNull();
  });
});

describe('VideoPlayer Component', () => {
  it('renders correctly with given videoId', () => {
    const testVideoId = 'KNtJGQkC-WI';
    render(<VideoPlayer videoId={testVideoId} />);

    const iframe = screen.getByTitle("YouTube video");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${testVideoId}`);
  });
});