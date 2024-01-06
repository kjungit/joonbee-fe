import {
  selectedChocieCategoryAtom,
  selectedRandomCategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useBeforeUnload() {
  const chocieCategory = useRecoilValue(selectedChocieCategoryAtom);
  const randomCategory = useRecoilValue(selectedRandomCategoryAtom);

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
    if (!chocieCategory && !randomCategory) router.push('/interview');
  }, [chocieCategory, randomCategory]);
}
