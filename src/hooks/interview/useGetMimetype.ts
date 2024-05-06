import { useState, useEffect } from 'react';

export default function useGetMimetype() {
  const [mimeType, setMimeTypeOptions] = useState<string>('video/webm');

  useEffect(() => {
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      if (MediaRecorder.isTypeSupported('video/webm; codecs=vp9')) {
        setMimeTypeOptions('video/webm; codecs=vp9');
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        setMimeTypeOptions('video/mp4');
      } else {
        console.error('Browser does not support any of the preferred video formats');
        return;
      }
    }
  }, []);

  return mimeType;
}
