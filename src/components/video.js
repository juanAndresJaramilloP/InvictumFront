import "./video.css";
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { calcularVideosAnteriorSiguiente } from './utils';
import { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from 'react-intl';
import NavBarLogin from "./NavBarLogin";

function Video(props) {
  let { nombre } = useParams();
 
  const [informacion, setInformacion] = useState(props.informacion);

 

  const [linkDelVideo, setLinkDelVideo] = useState('');
  const [idDelVideo, setIdDelVideo] = useState('');

  const { videoAnterior, videoSiguiente } = calcularVideosAnteriorSiguiente(informacion, nombre);

  const linkVideo = (data, nombre) => {
    
    for (let i = 0; i < data.length; i++) {
      const hijos = data[i].hijos;
      
      for (let j = 0; j < hijos.length; j++) {
       
        if (hijos[j].nombre === nombre) {
          return hijos[j].link;
        }
      }
    }

    return null;
  };

  const IdVideo = (link) => {

    const patrones = [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
    ];
    
    
    for (let patron of patrones) {

      const coincidencia = link.match(patron);
      if (coincidencia && coincidencia.length >= 2) {
        return coincidencia[1];
      }
    }


    return null;
  };
  useEffect(() => {
    if (props.informacion && props.informacion !== informacion) {
      setInformacion(props.informacion);
    }
  }, [props.informacion]);



  useEffect(() => {
    
    
    const nuevoLink = linkVideo(informacion, nombre);
    setLinkDelVideo(nuevoLink); 

    if (nuevoLink) {
      
      const nuevoId = IdVideo(nuevoLink);
      console.log(nuevoId)
      setIdDelVideo(nuevoId); 
    }
    
  }, [nombre, informacion]); 

  if (!informacion || informacion.length === 0) {

    return <div>Cargando información...</div>;
  }


  return (
    <div className="flex flex-col justify-between ">
      <NavBarLogin />
      <div className="anchoVideo mx-auto">
        <div className="video-nav-container my-5">
          <div className="video-nav-title">
            <h1 className="text-4xl font-bold">{nombre}</h1>

          </div>
          <div className="video-nav-buttons">
            <button
              className="nav-button mx-2"
              onClick={() => console.log("Ir a la clase anterior")}
            >
              <Link to={`/Aprendizaje/videos/${videoAnterior}`} className="nav-button mx-2">
              <FormattedMessage id="video.anterior" defaultMessage="Previous lesson" />
              </Link>

            </button>

            <Link to={`/Aprendizaje/videos/${videoSiguiente}`} className="nav-button mx-2">
            <FormattedMessage id="video.siguiente" defaultMessage="Next lesson" />
            </Link>

            <Link to="/Aprendizaje" className="nav-button" onClick={() => console.log("Salir al menú principal")}>
            <FormattedMessage id="video.menu" defaultMessage="Go to principal menu" />
            </Link>
          </div>
        </div>
        <div className="video-container mx-auto">
        
          <VideoPlayer key={idDelVideo} className=" video " videoId={IdVideo(linkVideo(informacion, nombre))} />



        </div>
      </div>
    </div>
  );
}

export default Video;
