import { interviewVideoUrlAtom } from '@/recoil/interviewVideoUrl/atom';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const useVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useRecoilState(interviewVideoUrlAtom);

  const onStartAudio = async () => {
    console.log('onStartAudio');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
  };

  const onStartVideo = async () => {
    onStartAudio();
    try {
      console.log('onStartVideo');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);

      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      console.log('비디오가 없어요');
    }
  };

  const onStartRecord = () => {
    if (!videoStream || !audioStream) {
      console.log(videoStream);
      console.log(audioStream);
      console.log('비디오나 오디오 스트림이 없습니다.');
      return;
    }
    console.log('onStartRecord');
    const combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    const mediaData: Blob[] = [];

    const recorder = new MediaRecorder(combined, {
      mimeType: 'video/webm; codecs=vp9',
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
};

export default useVideo;
