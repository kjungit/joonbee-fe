'use client';

import React, { useEffect } from 'react';

type WebcamProps = {
  isPermitVideo: boolean;
  size?: 'sm' | 'md';
  className?: string;
  onStartVideo?: () => void;
  onStartAudio?: () => void;
  videoRef?: React.MutableRefObject<HTMLVideoElement | null>;
};

const Webcam = ({ isPermitVideo, size = 'sm', className, videoRef, onStartVideo }: WebcamProps) => {
  useEffect(() => {
    if (isPermitVideo && onStartVideo) {
      onStartVideo();
    }
  }, [isPermitVideo]);

  const sizeStyles = {
    sm: 'w-[400px] h-[280px]',
    md: 'w-[584px] h-[374px]',
  };

  return isPermitVideo ? (
    <video
      autoPlay
      ref={videoRef}
      className={`object-cover shadow-md rounded-xl  ${sizeStyles[size]} ${className}`}
    />
  ) : (
    <div className={`bg-black shadow-md rounded-xl ${sizeStyles[size]} ${className}`}></div>
  );
};

export default Webcam;
