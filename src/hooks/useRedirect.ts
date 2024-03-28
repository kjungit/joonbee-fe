import { interviewTypeAtom } from '@/recoils/interview/atom';
import { useRouter } from 'next/navigation';
import React, { useEffect, useLayoutEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function useRedirect() {
  const interviewType = useRecoilValue(interviewTypeAtom);
  const router = useRouter();

  useLayoutEffect(() => {
    if (!interviewType) router.push('/interview/random');
  }, []);
}
