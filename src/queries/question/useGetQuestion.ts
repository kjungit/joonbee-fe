import { getQuestion } from '@/apis/services/questionApis';
import { selectQuestionCategoryState } from '@/recoils/home/question/selectQuestionCategory/atom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useGetQuestion = () => {
  const selectQuestionCategory = useRecoilValue(selectQuestionCategoryState);
  const {
    data: questionData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ['getQuestion', selectQuestionCategory.category, selectQuestionCategory.subCategory],
    queryFn: ({ pageParam }) => getQuestion(pageParam),
    initialPageParam: {
      page: 1,
      category: selectQuestionCategory.category,
      subCategory: selectQuestionCategory.subCategory,
    },
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length < lastPage.total
        ? {
            page: allPage.length + 1,
            category: selectQuestionCategory.category,
            subCategory: selectQuestionCategory.subCategory,
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
  };
};
