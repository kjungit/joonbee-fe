import { RefObject, useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedDeviceIdAtom } from '@/recoils/interview/atom';

export default function useVideoStream(videoRef: RefObject<HTMLVideoElement>) {
  const [selectedDeviceId] = useRecoilState(selectedDeviceIdAtom);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const onStartVideo = useCallback(async () => {
    try {
      if (selectedDeviceId.videoId === '1') {
        if (videoRef.current) videoRef.current.srcObject = null;
        return;
      }

      const videoOption = selectedDeviceId.videoId
        ? { deviceId: { exact: selectedDeviceId.videoId } }
        : true;
      const stream = await navigator.mediaDevices.getUserMedia({ video: videoOption });
      setVideoStream(stream);

      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('비디오 스트림을 시작하는 데 실패했습니다:', error);
    }
  }, [selectedDeviceId.videoId, videoRef]);

  return { onStartVideo, videoStream, setVideoStream };
}
