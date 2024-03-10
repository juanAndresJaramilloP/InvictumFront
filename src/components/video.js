import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./video.css";

function Video(props) {
  return (
    <Container className="min-vh-100 min-vw-100 d-flex flex-column justify-content-between px-5" style={{ backgroundColor: "#F4F6FD" }}>
      <Row>
        <Col>
          <div className="video-nav-container">
            <div className="video-nav-title">
              <h1>Never gonna give you up</h1>
            </div>
            <div className="video-nav-buttons">
              <button
                className="nav-button mx-2"
                onClick={() => console.log("Ir a la clase anterior")}
              >
                Anterior
              </button>
              <button
                className="nav-button mx-2"
                onClick={() => console.log("Ir a la siguiente clase")}
              >
                Siguiente
              </button>
              <button
                className="nav-button "
                onClick={() => console.log("Salir al menú principal")}
              >
                Salir al menú principal
              </button>
            </div>
          </div>
          <div className="video-container ">
            <iframe
              className="mb-5 video"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Video;
