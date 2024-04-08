import React, { useCallback, useState } from 'react';

export default function useAudioStream() {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const onStartAudio = useCallback(async () => {
    try {
      console.log('onStartAudio');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
    } catch (error) {
      console.error('오디오 스트림을 시작하는 데 실패했습니다:', error);
    }
  }, [setAudioStream]);

  return { onStartAudio, audioStream };
}
