import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import NavBar from './NavBar';
import { FormattedMessage } from 'react-intl';
import NavBarLogin from './NavBarLogin';

function Acordeon(props) {
  
  const informacion = props.informacion;
  const lenInfo = informacion.length;
  const [activo, setActivo]=useState(-1);
  const [visible, setVisible] = useState(props.informacion.map(() => false));

  const toggleVisibility = (index) => {
    if (index === activo) {
        setActivo(-1);
        setVisible(Array.from({length: lenInfo}, () => false));
    } else {
        setActivo(index);
    
        setVisible(Array.from({length: lenInfo}, (_, idx) => idx === index));
    }
};


  const obtenerLink = (nombre) => {return ("/Aprendizaje/videos/" + nombre)};

  return (
    <div className="color-gris-fondo min-h-screen" >
      <NavBarLogin />

      <div className="mt-36 mx-20">
        <div>
          <h2 className="text-4xl font-semibold mx-4 mb-5"><FormattedMessage id="acordeon.titulo" defaultMessage="What do you want to learn today?" /></h2>
          {props.informacion.map((elemento, index) => (
            <div key={index}>
              <div
                onClick={() => toggleVisibility(index)}
                className="cursor-pointer flex items-center"
              >
                <div className="my-3 mx-4 font-bold">{elemento.nombre}</div>
                {visible[index] ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
              </div>
              {visible[index] && (
                <div>
                  {elemento.hijos.map((hijo, hijoIndex) => (
                    <div className="mx-5 mt-2" key={hijoIndex}>
                      <span className="mr-1">•</span>
                      <a
                        href={obtenerLink(hijo.nombre)}
                        className="text-blue-600 hover:text-blue-800 focus:text-blue-800"
                      >
                        {hijo.nombre}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Acordeon;
