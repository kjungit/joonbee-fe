import React, { useEffect } from 'react';
import { useModal } from './useModal';
import { useRouter } from 'next/navigation';

export default function usePreventTablet() {
  const { isOpened, onClose, onOpen } = useModal();

  const router = useRouter();

  const handleResize = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth <= 768) {
      onOpen();
    } else {
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
    router.push('/interview');
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return { isOpened, handleClose };
}
