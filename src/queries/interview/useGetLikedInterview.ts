import { getInterview } from '@/apis/services/interviewApis';
import { CategoryName } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetLikedInterview = ({ selectCategory }: { selectCategory: CategoryName }) => {
  const {
    data: interviewLikedData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch: interviewRefetch,
  } = useInfiniteQuery({
    queryKey: ['getInterview', selectCategory, 'like'],
    queryFn: ({ pageParam }) => getInterview(pageParam),
    initialPageParam: {
      page: 1,
      selectCategory,
      sort: 'like',
    },
    enabled: false,
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length < lastPage.total
        ? {
            page: allPage.length + 1,
            selectCategory,
            sort: 'like',
          }
        : undefined;
    },
    select: pageData => {
      const data = pageData?.pages.flatMap(page => page.result);
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
    interviewLikedData,
    isFetching,
    isFetchingNextPage,
    status,
    setTarget,
    interviewRefetch,
  };
};
