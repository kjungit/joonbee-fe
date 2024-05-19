import { getUserQuestions } from '@/apis/services/questionApis';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useGetMyQuestion = () => {
  const searchParams = useSearchParams();
  const qFieldParams = searchParams.get('Qfield') as string;
  const subFieldParams = searchParams.get('subField') as string;
  const {
    data: questionData,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['getMyQuestion', qFieldParams, subFieldParams],
    queryFn: ({ pageParam }) => getUserQuestions(pageParam),
    initialPageParam: {
      page: 1,
      category: qFieldParams,
      subCategory: subFieldParams,
    },
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length < lastPage.total
        ? {
            page: allPage.length + 1,
            category: qFieldParams,
            subCategory: subFieldParams,
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
    questionData,
    error,
    isFetching,
    isFetchingNextPage,
    status,
    setTarget,
    refetch,
  };
};
