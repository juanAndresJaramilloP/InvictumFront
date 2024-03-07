import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {List,FileEarmarkPdfFill} from 'react-bootstrap-icons';

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-dark" size='md' className="d-lg-none" onClick={handleShow} style={{ position: 'absolute', left: 0 }}>
        <List size={25}/>
      </Button>
      <Offcanvas show={show} onHide={handleClose} responsive="lg" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="mb-0">
            <FileEarmarkPdfFill /> Reporte Patrimonial
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;