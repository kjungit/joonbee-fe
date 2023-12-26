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
    const newSubcategory = subcategory === '세부 카테고리' ? '' : subcategory;
    return `/api/cart/questions?page=${newPage}&category=${category}&subcategory=${newSubcategory}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<UserQuestionsResponseData[]>(
    getKey,
    url => getUserQuestions(url),
    {
      revalidateFirstPage: false,
    },
  );

  const newData = data ? ([] as UserQuestionsResponseData[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, error, size, isValidating, setTarget, setSize };
}
