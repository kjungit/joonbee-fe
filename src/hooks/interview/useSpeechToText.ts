import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '../useModal';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const { isOpened: isSupportedBrowser, onClose, onOpen } = useModal();

  const router = useRouter();

  const onNavigate = () => {
    onClose();
    router.push('/interview');
  };

  const onStartListening = () => {
    // console.log('onStartListening');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      onOpen();
      return;
    }

    const recognition = new SpeechRecognition();
    setSpeechRecognition(recognition);
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let speechToText = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscript(speechToText);
    };

    recognition.start();
  };

  const onStopListening = () => {
    // console.log('onStopListening');
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  return {
    transcript,
    setTranscript,
    onStartListening,
    onStopListening,
    isSupportedBrowser,
    onNavigate,
  };
};

export default useSpeechToText;
