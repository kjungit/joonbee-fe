import React, { useRef } from 'react';
import useAudioStream from './useAudioStream';
import useVideoStream from './useVideoStream';
import useVideo from './useVideo';

export default function usePermitDevice() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { onStartAudio } = useAudioStream();
  const { onStartVideo } = useVideoStream(videoRef);

  const checkVideoPermission = async () => {
    onStartVideo();
  };

  const checkAudioPermission = async () => {
    onStartAudio();
  };

  return { checkVideoPermission, checkAudioPermission };
}
