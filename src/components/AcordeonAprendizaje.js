import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function Acordeon( props ) {

  const [visible, setVisible] = useState(new Array(props.informacion.length).fill(false));

  const toggleVisibility = (index) => {
    setVisible(visible.map((item, idx) => idx === index ? !visible[index] : false));
  };
  

  return (
    <Container  style={{ backgroundColor: '#F4F6FD' }}>
      <Row>
        <Col>

          <div className='mt-5 ml-4'>
            <h2 className='mx-4 mb-5'>Que quieres aprender hoy?</h2>
            {props.informacion.map((elemento, index) => (
              <div key={index}>
                <div onClick={() => toggleVisibility(index)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <div className='my-3 mx-4'  style={{ fontWeight: 'bold' }}>{elemento.nombre}</div> 
                  {visible[index] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {visible[index] && (
                  <div>
                    {elemento.hijos.map((hijo, hijoIndex) => (
                      <div className='mx-5 mt-2' key={hijoIndex}>
                        • <a href={hijo.link}>{hijo.nombre}</a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
    
  );
}

export default Acordeon;
