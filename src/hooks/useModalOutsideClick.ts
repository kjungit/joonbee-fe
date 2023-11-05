import React, { useState, useRef, useEffect } from 'react';

const useModalOutsideClick = () => {
  const [isOpened, setIsOpened] = useState(false);
  const ModalRef = useRef<HTMLDivElement | null>(null);

  // console.log(ModalRef.current);

  const toggleModal = () => {
    setIsOpened(prev => !prev);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (ModalRef.current && !ModalRef.current.contains(e.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return { isOpened, toggleModal, ModalRef };
};

export default useModalOutsideClick;
