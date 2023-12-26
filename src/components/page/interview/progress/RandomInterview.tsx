'use client';

import { questionCountAtom } from '@/recoil/interviewSetting/atoms';
import { selectedCategoryAtom } from '@/recoil/selectedCategory/atom';
import { selectedSubcategoryListAtom } from '@/recoil/selectedSubcategoryList/atom';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import Questions from './Questions';
import { getRandomQuestions } from '@/app/apis/services/cart';

export default function RandomInterview() {
  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryListAtom);
  const questionCount = useRecoilValue(questionCountAtom);

  const params = {
    category,
    subcategory,
    questionCount,
  };

  const { data: questions, isLoading } = useSWR(['/api/question/gpt', params], () =>
    getRandomQuestions(params),
  );

  if (isLoading) return;

  return (
    <>
      <Questions questions={questions} />
    </>
  );
}
