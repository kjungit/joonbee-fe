'use client';

import { questionCountAtom } from '@/recoil/interviewSetting/atoms';
import {
  selectedCategoryAtom,
  selectedRandomCategoryAtom,
  selectedRandomSubcategoryAtom,
} from '@/recoil/selectedCategory/atom';
import { selectedSubcategoryListAtom } from '@/recoil/selectedSubcategoryList/atom';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import Questions from './Questions';
import { getRandomQuestions } from '@/app/apis/services/question';

export default function RandomInterview() {
  const category = useRecoilValue(selectedRandomCategoryAtom);
  const subcategory = useRecoilValue(selectedRandomSubcategoryAtom);
  const questionCount = useRecoilValue(questionCountAtom);

  const { data: questions, isLoading } = useSWR(
    ['/api/question/gpt', category, subcategory, questionCount],
    () => getRandomQuestions(category, subcategory, questionCount),
  );

  if (isLoading) return;

  return (
    <>
      <Questions questions={questions} />
    </>
  );
}
