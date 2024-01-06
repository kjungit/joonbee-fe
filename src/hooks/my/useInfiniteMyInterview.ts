import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import { CategoryName, SubcategoryName } from '@/types/question';
import { useRecoilValue } from 'recoil';
import useSWRInfinite from 'swr/infinite';
import { useIntersectionObserver } from '../useInterSectionObserver';
import { useEffect, useState } from 'react';
import { QuestionResponse, getUserQuestions } from '@/app/apis/services/question';
import { getMyCategoryInterview } from '@/app/apis/services/member';

interface DataProps {
  categoryName: string;
  questionCount: number;
  interviewId: number;
}
export default function useInfiniteMyInterview(category: 'interview' | 'liked' | null) {
  if (category === null) category = 'interview';
  const getKey = (page: number, previousPageData: DataProps[]) => {
    const newPage = page + 1;
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    const newCategory =
      category === 'interview' ? 'api/member/category' : 'api/member/category/like';
    return `${newCategory}?page=${newPage}`;
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite<DataProps[]>(
    getKey,
    url => getMyCategoryInterview(url),
    {
      revalidateFirstPage: false,
    },
  );

  const newData = data ? ([] as DataProps[]).concat(...data) : [];

  const { setTarget } = useIntersectionObserver(setSize);
  return { newData, error, size, isValidating, setTarget, setSize };
}
