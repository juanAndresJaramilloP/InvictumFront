import "./video.css";
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { calcularVideosAnteriorSiguiente } from './utils';
import { useEffect } from "react";
import { useState } from "react";

function Video(props) {
  let { nombre } = useParams();
  const informacion = props.informacion;

  const [linkDelVideo, setLinkDelVideo] = useState('');
  const [idDelVideo, setIdDelVideo] = useState('');

  const { videoAnterior, videoSiguiente } = calcularVideosAnteriorSiguiente(props.informacion, nombre);

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

    
    const nuevoLink = linkVideo(informacion, nombre);
    setLinkDelVideo(nuevoLink); 

    if (nuevoLink) {
      const nuevoId = IdVideo(nuevoLink);
      console.log(nuevoId)
      setIdDelVideo(nuevoId); 
    }
    
  }, [nombre, informacion]); 




  return (
    <div className="flex flex-col justify-between ">
      <NavBar />
      <div className="anchoVideo mx-auto">
        <div className="video-nav-container my-5">
          <div className="video-nav-title">
            <h1 class="text-4xl font-bold">{nombre}</h1>

          </div>
          <div className="video-nav-buttons">
            <button
              className="nav-button mx-2"
              onClick={() => console.log("Ir a la clase anterior")}
            >
              <Link to={`/Aprendizaje/videos/${videoAnterior}`} className="nav-button mx-2">
                Anterior
              </Link>

            </button>

            <Link to={`/Aprendizaje/videos/${videoSiguiente}`} className="nav-button mx-2">
              Siguiente
            </Link>

            <Link to="/Aprendizaje" className="nav-button" onClick={() => console.log("Salir al menú principal")}>
              Salir al menú
            </Link>
          </div>
        </div>
        <div className="video-container mx-auto">

          <VideoPlayer key={idDelVideo} className="mb-5 video " videoId={IdVideo(linkVideo(props.informacion, nombre))} />



        </div>
      </div>
    </div>
  );
}

export default Video;
