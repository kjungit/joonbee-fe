'use client';

import React, { useRef, useState } from 'react';

const CONSTRAINTS = { video: true };

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = async () => {
    console.log(videoRef);
    const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <div className="App">
      <video autoPlay ref={videoRef} />
      <button onClick={startVideo}>start</button>
    </div>
  );
};

export default Webcam;
