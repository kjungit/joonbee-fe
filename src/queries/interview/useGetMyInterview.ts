import { getMyInterview } from '@/apis/services/memberApis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetMyInterview = () => {
  const {
    data: interviewData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['getMyInterview'],
    queryFn: ({ pageParam }) => getMyInterview(pageParam),
    initialPageParam: {
      page: 1,
    },
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length <= lastPage.total
        ? {
            page: allPage.length,
          }
        : undefined;
    },
    select: pageData => {
      const data = pageData?.pages.slice(1).flatMap(page => page.result);
      return data?.[0] === null ? null : data;
    },
  });
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(observerCallback);

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [observerCallback, target]);

  return {
    interviewData,
    error,
    isFetching,
    isFetchingNextPage,
    status,
    setTarget,
  };
};
