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

const Webcam = ({
  isPermitVideo,
  size = 'sm',
  className,
  videoRef,
  onStartVideo,
  onStartAudio,
}: WebcamProps) => {
  useEffect(() => {
    if (isPermitVideo && onStartVideo ) {
      onStartVideo();
    }
  }, [isPermitVideo]);

  const sizeStyles = {
    sm: 'w-[500px] h-[320px]',
    md: 'w-[584px] h-[374px]',
  };

  return isPermitVideo ? (
    <video autoPlay ref={videoRef} className={`object-cover ${sizeStyles[size]} ${className}`} />
  ) : (
    <div className={`bg-black ${sizeStyles[size]} ${className}`}></div>
  );
};

export default Webcam;
