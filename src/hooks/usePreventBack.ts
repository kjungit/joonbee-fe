import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useModal } from './useModal';

export default function usePreventBack() {
  const { isOpened, onClose, onOpen } = useModal();

  const router = useRouter();

  const handleBeforePopState = (e: PopStateEvent) => {
    e.preventDefault();
    onOpen();
  };

  const handleConfirm = () => {
    router.push('/interview/random');
    onClose();
  };

  const handleClose = () => {
    history.pushState(null, document.title, location.href);
    onClose();
  };

  useEffect(() => {
    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', handleBeforePopState);

    return () => {
      window.removeEventListener('popstate', handleBeforePopState);
    };
  }, []);

  return { isOpened, handleClose, handleConfirm };
}
