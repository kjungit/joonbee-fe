'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import NoQuestionMessage from '@/components/ui/NoQuestionMessage';
import { myQuestionClickSelector } from '@/recoil/myQuestion/withClick';
import { myQuestionFilterSelector } from '@/recoil/myQuestion/withFilter';
import React from 'react';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import {
  UserQuestionsResponseData,
  getRandomQuestions,
  getUserQuestions,
} from '@/app/apis/services/cart';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import DropdownCategory from '@/components/common/DropdownCategory';

export default function QuestionChoice() {
  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryAtom);

  const params = {
    category,
    subcategory,
  };

  const { data: questions, isLoading } = useSWR<UserQuestionsResponseData[]>(
    ['/api/cart/questions', params],
    () => getUserQuestions(params),
  );

  console.log(questions);

  // const filteredQuestions = useRecoilValue(myQuestionFilterSelector);
  // const clickedQuestions = useRecoilValue(myQuestionClickSelector);

  // const onDisabledButton = () => {
  //   if (clickedQuestions.length === 0) {
  //     return true;
  //   }
  //   return false;
  // };

  return (
    <>
      {/* <DropdownCategory size="xs" /> */}
      <QuestionForm />
      <div
        className={`flex flex-col gap-3 scroll-hide overflow-y-scroll pb-2 items-center h-[70%] ${
          questions?.length === 0 && 'justify-center'
        }`}>
        {questions?.map(question => (
          <CategorizedQuestionCard
            questionId={question.questionId}
            category={question.category}
            subcategory={question.subcategory}
            questionContent={question.questionContent}
            // isChecked={question.isChecked}
            key={question.questionId}
            size="sm"
          />
        ))}
        {questions?.length === 0 && <NoQuestionMessage />}
      </div>

      <Link href="/interview/choice/setting">
        {/* <Button
          color="blueSecondary"
          size="lg"
          className="absolute bottom-9 right-[50px]"
          disabled={onDisabledButton()}>
          {clickedQuestions.length}개 선택된 질문 보기
        </Button> */}
      </Link>
    </>
  );
}
