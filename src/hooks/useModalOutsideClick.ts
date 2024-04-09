import React, { useRef, useEffect } from 'react';

export default function useModalOutsideClick<T extends HTMLElement>(onClose: () => void) {
  const modalRef = useRef<T | null>(null);

  const handleDocumentClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return { modalRef };
}
