import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { interviewVideoUrlAtom } from '@/recoils/interview/atom';
import useGetMimetype from './useGetMimetype';

export default function useMediaRecord(videoStream: MediaStream, audioStream: MediaStream) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedMediaUrl, setRecordedMediaUrl] = useRecoilState(interviewVideoUrlAtom);

  const mimeType = useGetMimetype();

  const onStartRecord = () => {
    if (!videoStream || !audioStream) {
      console.log('비디오나 오디오 스트림이 없습니다.');
      return;
    }

    const combined = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    const mediaData: Blob[] = [];
    const recorder = new MediaRecorder(combined, { mimeType: mimeType });
    setMediaRecorder(recorder);

    recorder.ondataavailable = event => {
      if (event.data.size > 0) mediaData.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(mediaData, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setRecordedMediaUrl(url);
    };

    recorder.start();
  };

  const onStopRecord = () => {
    if (mediaRecorder) mediaRecorder.stop();
  };

  return { onStartRecord, onStopRecord, recordedMediaUrl };
}
