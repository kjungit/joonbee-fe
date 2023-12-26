import { UserQuestionsResponseData, getUserQuestions } from '@/app/apis/services/cart';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useRecoilValue } from 'recoil';
import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { useEffect, useState } from 'react';

export default function useInfiniteUserQuestion(
  category: CategoryName,
  subcategory: SubcategoryName,
) {
  const getKey = (page: number, previousPageData: UserQuestionsResponseData[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const newCategory = category === 'All' ? '' : category;
    return `/api/cart/questions?page=${newPage}&category=${newCategory}&subcategory=${subcategory}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<UserQuestionsResponseData[]>(
    getKey,
    url => getUserQuestions(url),
    {
      initialSize: 1,
      revalidateFirstPage: false,
    },
  );

  const newData = data?.flatMap(data => data);
  console.log('new', newData);

  const isFetching = !isValidating;

  const { setTarget } = useIntersectionObserver(setSize);

  return { newData, error, size, isValidating, setTarget, setSize };
}
