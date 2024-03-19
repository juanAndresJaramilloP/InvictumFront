import React from 'react';

function VideoPlayer(props) {

  const videoId = props.videoId;


  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  console.log(videoUrl)

  return (
    <div className="video-container ">
      <iframe
        className="mx-auto video"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
