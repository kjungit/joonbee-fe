import { useRef } from 'react';

export const useScrollToBottom = () => {
  const endRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { endRef, scrollToBottom };
};
