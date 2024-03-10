import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

function Acordeon(props) {
  const [visible, setVisible] = useState(new Array(props.informacion.length).fill(false));

  const toggleVisibility = (index) => {
    setVisible(visible.map((item, idx) => (idx === index ? !visible[index] : false)));
  };

  return (
    <div className="bg-gray-100">
      <div className="mt-5 mx-4">
        <h2 className="mx-4 mb-5">¿Qué quieres aprender hoy?</h2>
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
                    <a href={hijo.link}>{hijo.nombre}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Acordeon;
