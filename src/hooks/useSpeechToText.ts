import React, { useState, useEffect } from 'react';

const useSpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);

  const onStartListening = () => {
    console.log('onStartListening');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setSpeechRecognition(recognition);
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.lang = 'ko-KR';

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const speechToText = e.results[0][0].transcript;
      setTranscript(speechToText);
      console.log('Speech to text:', speechToText);
    };

    recognition.start();
  };

  const onStopListening = () => {
    console.log('onStopListening');
    if (speechRecognition) {
      speechRecognition.stop();
    }
  };

  return { transcript, setTranscript, onStartListening, onStopListening };
};

export default useSpeechToText;
