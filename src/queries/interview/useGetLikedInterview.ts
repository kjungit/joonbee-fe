import { getInterview } from '@/apis/services/interviewApis';
import { CategoryName } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useGetLikedInterview = () => {
  const searchParams = useSearchParams();
  const iFieldParams = searchParams.get('Ifield') as CategoryName;
  const sortParams = (searchParams.get('sort') as 'latest') || 'like';

  const {
    data: interviewLikedData,
    fetchNextPage,
    hasNextPage,
    isRefetching,
    isFetchingNextPage,
    status,
    refetch: interviewRefetch,
  } = useInfiniteQuery({
    queryKey: ['getInterview', iFieldParams, sortParams],
    queryFn: ({ pageParam }) => getInterview(pageParam),
    initialPageParam: {
      page: 1,
      selectCategory: iFieldParams || 'fe',
      sort: sortParams,
    },
    enabled: true,
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length < lastPage.total
        ? {
            page: allPage.length + 1,
            selectCategory: iFieldParams || 'fe',
            sort: sortParams,
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
    isRefetching,
    isFetchingNextPage,
    status,
    setTarget,
    interviewRefetch,
  };
};
