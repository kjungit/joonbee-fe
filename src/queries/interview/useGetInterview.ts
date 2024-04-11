import { getInterview } from '@/apis/services/interviewApis';
import { CategoryName } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useGetInterview = ({
  selectCategory,
  sort,
}: {
  selectCategory: CategoryName;
  sort: string;
}) => {
  const {
    data: interviewData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
    refetch: interviewRefetch,
  } = useInfiniteQuery({
    queryKey: ['getInterview', selectCategory, sort],
    queryFn: ({ pageParam }) => getInterview(pageParam),
    initialPageParam: {
      page: 1,
      selectCategory,
      sort,
    },
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length <= lastPage.total
        ? {
            page: allPage.length,
            selectCategory,
            sort,
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
    interviewData,
    error,
    isFetching,
    isFetchingNextPage,
    status,
    setTarget,
    interviewRefetch,
  };
};
