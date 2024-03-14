import React, { useState } from 'react';

export default function useAudio() {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  console.log(audioStream);

  const onStartAudio = async () => {
    try {
      console.log('onStartAudio');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
    } catch (error) {
      console.error('오디오 스트림을 시작하는 데 실패했습니다:', error);
    }
  };

  return { onStartAudio, audioStream };
}
