import { getUserQuestions } from '@/apis/services/questionApis';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import { CategoryName, SubcategoryName } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useGetMyQuestion = () => {
  const mySelectCategory = useRecoilValue(mySelectQuestionCategoryState);
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
    queryKey: ['getMyQuestion', mySelectCategory.category, mySelectCategory.subCategory],
    queryFn: ({ pageParam }) => getUserQuestions(pageParam),
    initialPageParam: {
      page: 1,
      category: mySelectCategory.category,
      subCategory: mySelectCategory.subCategory,
    },
    getNextPageParam: (lastPage, allPage) => {
      const resultData = allPage.flatMap(page => page.result);
      return resultData.length < lastPage.total
        ? {
            page: allPage.length + 1,
            category: mySelectCategory.category,
            subCategory: mySelectCategory.subCategory,
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
