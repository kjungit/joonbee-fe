import { UserQuestionsResponseData } from '@/app/apis/services/cart';
import { useEffect, useState } from 'react';

export const useIntersectionObserver = (setSize: any, isLoading: boolean) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const observerCallback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && isLoading) {
        setSize((prev: any) => prev + 1);
      }
    });
  };

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
    });

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [observerCallback, target]);

  return { setTarget };
};
