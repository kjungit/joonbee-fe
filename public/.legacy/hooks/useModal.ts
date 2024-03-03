import { useCallback, useState } from 'react';

export const useModal = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsOpened(true);
  }, []);
  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  const onToggle = () => {
    setIsOpened(prev => !prev);
  };

  return { isOpened, onClose, onOpen, onToggle };
};
