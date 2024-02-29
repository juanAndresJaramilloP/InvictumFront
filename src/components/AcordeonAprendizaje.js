import React, { useState } from 'react';

function Acordeon( props ) {

  const [visible, setVisible] = useState(new Array(props.informacion.length).fill(false));

  const toggleVisibility = (index) => {
    setVisible(visible.map((item, idx) => idx === index ? !item : item));
  };

  return (
    <div className='mt-5 ml-4'>
      {props.informacion.map((elemento, index) => (
        <div key={index}>
          <button onClick={() => toggleVisibility(index)}>{elemento.nombre}</button>
          {visible[index] && (
            <div>
              {elemento.hijos.map((hijo, hijoIndex) => (
                <div key={hijoIndex}>
                  <a href={hijo.link}>{hijo.nombre}</a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Acordeon;