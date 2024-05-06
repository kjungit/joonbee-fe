import React, { useRef } from 'react';
import useAudioStream from './useAudioStream';
import useVideoStream from './useVideoStream';
import useVideo from './useVideo';

export default function usePermitDevice() {
  const { onStartAudio } = useAudioStream();

  const checkVideoPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
      console.error('오디오 스트림을 시작하는 데 실패했습니다:', error);
    }
  };

  const checkAudioPermission = async () => {
    onStartAudio();
  };

  return { checkVideoPermission, checkAudioPermission };
}
