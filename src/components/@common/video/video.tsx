'use client';
import React from 'react';

interface VideoProps {
  className?: string;
  videoRef?: React.MutableRefObject<HTMLVideoElement | null>;
}

export default function Video({ className, videoRef }: VideoProps) {
  return (
    <video
      autoPlay
      ref={videoRef}
      className={`object-cover shadow-md rounded-2xl w-full h-[240px] ${className}`}
    />
  );
}
