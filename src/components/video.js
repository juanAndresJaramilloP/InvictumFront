import "./video.css";
import { useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import React from 'react';
import { calcularVideosAnteriorSiguiente, IdVideo, linkVideo } from './utils';
import { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from 'react-intl';
import NavBarLogin from "./NavBarLogin";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Video(props) {
  const navigate = useNavigate();
  let { nombre } = useParams();
  const location = useLocation();
  const { email, password, name, role} = location.state;

  const [informacion, setInformacion] = useState(props.informacion);

  const [idDelVideo, setIdDelVideo] = useState('');

  const { videoAnterior, videoSiguiente } = calcularVideosAnteriorSiguiente(informacion, nombre);

  useEffect(() => {
    if (props.informacion && props.informacion !== informacion) {
      setInformacion(props.informacion);
    }
  }, [props.informacion]);



  useEffect(() => {


    const nuevoLink = linkVideo(informacion, nombre);

    if (nuevoLink) {

      const nuevoId = IdVideo(nuevoLink);
      console.log(nuevoId)
      setIdDelVideo(nuevoId);
    }

  }, [nombre, informacion]);

  if (!informacion || informacion.length === 0) {

    return <div>Cargando información...</div>;
  }

  const handleMove = (link) => {
    navigate(link, { state: { email: email } });

  };


  return (
    <div className="flex flex-col justify-between ">
      <NavBarLogin email = {email} password={password} name={name} role={role}/>
      <div className="anchoVideo mx-auto">
        <div className="video-nav-container my-5">
          <div className="video-nav-title">
            <h1 className="text-4xl font-bold">{nombre}</h1>

          </div>
          <div className="video-nav-buttons">
            <button
              className="nav-button mx-2"
              onClick={() => handleMove(`/Aprendizaje/videos/${videoAnterior}`)}
            >
              <FormattedMessage id="video.anterior" defaultMessage="Previous lesson" />
            </button>

            <button
              className="nav-button mx-2"
              onClick={() => handleMove(`/Aprendizaje/videos/${videoSiguiente}`)}
            >
              <FormattedMessage id="video.siguiente" defaultMessage="Next lesson" />
            </button>

            <button
              className="nav-button"
              onClick={() => handleMove("/Aprendizaje")}
            >
              <FormattedMessage id="video.menu" defaultMessage="Go to principal menu" />
            </button>
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
