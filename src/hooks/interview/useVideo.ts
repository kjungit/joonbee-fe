import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useAudio from './useAudio';
import { interviewVideoUrlAtom, selectedDeviceIdAtom } from '@/recoils/interview/atom';

export default function useVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useRecoilState(selectedDeviceIdAtom);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useRecoilState(interviewVideoUrlAtom);

  const { onStartAudio, audioStream } = useAudio();
  
  const onStartVideo = async () => {
    onStartAudio();
    try {
      // "비디오 없음" 선택 시 처리
      if (selectedDeviceId.videoId === '1') {
        if (videoRef.current) {
          videoRef.current.srcObject = null; // 비디오 스트림 제거
        }
        return; // 추가 비디오 설정을 중단
      }

      // 기존 비디오 설정 로직
      const videoOption = selectedDeviceId.videoId
        ? { deviceId: { exact: selectedDeviceId.videoId } }
        : true;

      console.log('onStartVideo');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoOption,
      });
      setVideoStream(stream);

      if (videoRef && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('비디오 스트림을 시작하는 데 실패했습니다:', error);
    }
  };

  const onStartRecord = () => {
    if (!videoStream || !audioStream) {
      console.log('비디오나 오디오 스트림이 없습니다.');
      return;
    }
    console.log('onStartRecord');
    const combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    const mediaData: Blob[] = [];

    const recorder = new MediaRecorder(combined, {
      mimeType: 'video/webm; codecs=vp8,opus',
    });
    setMediaRecorder(recorder);

    recorder.ondataavailable = event => {
      if (event.data.size > 0) {
        mediaData.push(event.data);
      }
    };

    recorder.onstop = () => {
      console.log('onstop');
      const blob = new Blob(mediaData, { type: 'video/webm' });

      const url = URL.createObjectURL(blob);
      setRecordedMediaUrl(url);
    };

    recorder.start();
  };

  const onToggleRecord = () => {
    if (!mediaRecorder) return;

    if (mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      console.log('video pasue', mediaRecorder);
    } else if (mediaRecorder.state === 'paused') {
      console.log('video resume');
      mediaRecorder.resume();
    }
  };

  const onStopRecord = () => {
    console.log('onStopRecord');
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const onDownload = (recordedMediaUrl: string) => {
    console.log('onDownload');
    const anchor = document.createElement('a');
    anchor.href = recordedMediaUrl;
    anchor.download = 'video.webm';
    anchor.click();
    URL.revokeObjectURL(recordedMediaUrl);
  };

  return {
    onStartVideo,
    videoRef,
    onStartAudio,
    onStartRecord,
    onStopRecord,
    onDownload,
    recordedMediaUrl,
    onToggleRecord,
  };
}
