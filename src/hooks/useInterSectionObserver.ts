import { UserQuestionsResponseData } from '@/app/apis/services/cart';
import { useEffect, useMemo, useState } from 'react';

export const useIntersectionObserver = (setSize: any, isFetching: boolean) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  useEffect(() => {
    if (shouldLoadMore) setSize((prev: any) => prev + 1);
  }, [shouldLoadMore]);

  const observerCallback = useMemo(() => {
    return (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldLoadMore(true);
        }
      });
    };
  }, []);

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
