import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import NavBarLogin from './NavBarLogin';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Acordeon(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password, name, role } = location.state;

  const informacion = props.informacion;
  const obtenerLink = (nombre) => { return ("/Aprendizaje/videos/" + nombre) };

  const [abierto, setAbierto] = useState(new Array(informacion.length).fill(false));

  const toggleAcordeon = index => {
    const nuevoEstado = new Array(informacion.length).fill(false);
    nuevoEstado[index] = !abierto[index];
    setAbierto(nuevoEstado);
  };
  const handleHijo = (link) => {
    navigate(link, { state: { email: email, password: password, name: name, role: role } });
  };



  return (
    <div className="color-gris-fondo min-h-screen" >
      <NavBarLogin email={email} password={password} name={name} role={role}/>

      <div className="mt-20 mx-20">

        <h2 className="text-4xl font-semibold mx-4 mb-16"><FormattedMessage id="acordeon.titulo" defaultMessage="What do you want to learn today?" /></h2>

        <div className="flex flex-wrap">
          {informacion.map((elemento, index) => (
            <div className="w-full md:w-1/2 p-2" key={index}>
              <div className={`collapse collapse-arrow bg-blue-200 mb-2 rounded-3xl ${abierto[index] ? 'collapse-open' : ''}`}>
                <input type="checkbox"
                  name={`accordion-${index}`}
                  checked={abierto[index]}
                  onChange={() => toggleAcordeon(index)}
                  className="peer"
                />
                <div className="collapse-title text-xl font-medium">
                  {elemento.nombre}
                </div>
                <div className="collapse-content ml-4">
                  {elemento.hijos.map((hijo, hijoIndex) => (
                    <div key={hijoIndex}>
                      • <button
                        onClick={() => handleHijo(obtenerLink(hijo.nombre))}
                        className="text-blue-600 hover:text-blue-800 focus:text-blue-800"
                      >
                        {hijo.nombre}
                      </button>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}

export default Acordeon;
