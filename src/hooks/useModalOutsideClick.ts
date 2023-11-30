import React, { useState, useRef, useEffect } from 'react';

const useModalOutsideClick = (onClose: () => void) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

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
};

export default useModalOutsideClick;
