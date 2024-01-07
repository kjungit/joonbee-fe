import { interviewTypeAtom } from '@/recoil/interviewType/atom';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function useBeforeUnload() {
  const interviewType = useRecoilValue(interviewTypeAtom);

  const router = useRouter();

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!interviewType) router.push('/interview');
  }, []);
}
