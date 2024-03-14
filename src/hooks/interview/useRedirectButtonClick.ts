import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function useRedirectButtonClick(path: string) {
  const [isPressedBtn, setIsPressedBtn] = useState<boolean>(false);

  const onMovePage = () => {
    setIsPressedBtn(true);
  };

  const router = useRouter();

  useEffect(() => {
    if (isPressedBtn) {
      const timeout = setTimeout(() => {
        router.push(path);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isPressedBtn, path]);

  return { onMovePage, isPressedBtn };
}
