'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import NoQuestionMessage from '@/components/ui/NoQuestionMessage';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import useUserQuestion from '@/hooks/questions/useUserQuestion';

export default function QuestionChoice() {
  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryAtom);

  const params = {
    category,
    subcategory,
  };

  const { myQuestions, isLoading } = useUserQuestion(params);

  const clickedCount = useMemo(() => {
    return myQuestions.filter(item => item.isClicked === true).length;
  }, [myQuestions]);

  const disableBtn = () => {
    if (myQuestions?.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <QuestionForm />
      <div
        className={`overflow-y-scroll flex flex-col gap-2 items-center h-[360px] scroll-hide ${
          myQuestions?.length === 0 && 'justify-center'
        }`}>
        {myQuestions?.map(question => (
          <CategorizedQuestionCard
            questionId={question.questionId}
            category={question.category}
            subcategory={question.subcategory}
            questionContent={question.questionContent}
            isClicked={question.isClicked}
            key={question.questionId}
            size="sm"
          />
        ))}
        {myQuestions?.length === 0 && <NoQuestionMessage />}
      </div>

      <Link href="/interview/choice/setting">
        <Button
          color="blueSecondary"
          size="auto"
          text="sm"
          className="absolute bottom-8 right-8"
          disabled={disableBtn()}>
          {clickedCount}개 선택된 질문 보기
        </Button>
      </Link>
    </>
  );
}
