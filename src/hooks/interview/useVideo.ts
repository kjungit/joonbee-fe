import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interviewVideoUrlAtom, selectedDeviceIdAtom } from '@/recoils/interview/atom';
import useAudioStream from './useAudioStream';
import useVideoStream from './useVideoStream';

export default function useVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useRecoilState(selectedDeviceIdAtom);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useRecoilState(interviewVideoUrlAtom);

  const { onStartAudio, audioStream } = useAudioStream();
  const { onStartVideo, videoStream, setVideoStream } = useVideoStream(videoRef);

  const onStart = async () => {
    await onStartAudio();
    await onStartVideo();
  };

  const onStartRecord = () => {
    if (!videoStream || !audioStream) {
      return;
    }
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
    } else if (mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
    }
  };

  const onStopRecord = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const onDownload = (recordedMediaUrl: string) => {
    const anchor = document.createElement('a');
    anchor.href = recordedMediaUrl;
    anchor.download = 'video.webm';
    anchor.click();
    URL.revokeObjectURL(recordedMediaUrl);
  };

  return {
    onStart,
    videoRef,
    onStartAudio,
    onStartRecord,
    onStopRecord,
    onDownload,
    recordedMediaUrl,
    onToggleRecord,
  };
}
