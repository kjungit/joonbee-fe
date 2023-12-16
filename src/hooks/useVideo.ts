import { useEffect, useRef, useState } from 'react';

const useVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useState('');

  useEffect(() => {
    onStartAudio();
  }, []);

  // useEffect(() => {
  //   if (videoStream && audioStream) onStartRecord();
  // }, [videoStream, audioStream]);

  const onStartAudio = async () => {
    console.log('onStartAudio');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
  };

  const onStartVideo = async () => {
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
    if (!videoStream) return;
    console.log('onStartRecord');
    const combined = new MediaStream([...videoStream!.getTracks(), ...audioStream!.getTracks()]);
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

  const onStopRecord = () => {
    console.log('onStopRecord');
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const onDownload = () => {
    console.log('onDownload');
    if (recordedMediaUrl) {
      const anchor = document.createElement('a');
      anchor.href = recordedMediaUrl;
      anchor.download = 'video.webm';
      anchor.click();
      URL.revokeObjectURL(recordedMediaUrl);
    }
  };

  return {
    onStartVideo,
    videoRef,
    onStartAudio,
    onStartRecord,
    onStopRecord,
    onDownload,
    recordedMediaUrl,
  };
};

export default useVideo;
