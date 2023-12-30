'use client';

import Link from 'next/link';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import NoQuestionMessage from '@/components/ui/NoQuestionMessage';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { selectedCategoryAtom, selectedSubcategoryAtom } from '@/recoil/selectedCategory/atom';
import useInfiniteUserQuestion from '@/hooks/questions/useInfiniteUserQuestion';
import { useScrollToBottom } from '@/hooks/useScrollToBottm';

export default function QuestionChoice() {
  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryAtom);

  const {
    newData: myQuestions,
    setTarget,
    mutate,
  } = useInfiniteUserQuestion(category, subcategory);

  const { endRef, scrollToBottom } = useScrollToBottom();

  const handleSubmitQuestion = async () => {
    await mutate();
    // scrollToBottom();
  };

  const disableBtn = () => {
    if (myQuestions?.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      <QuestionForm callback={handleSubmitQuestion} />
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
            // isClicked={question.isClicked}
            key={question.questionId}
            size="sm"
          />
        ))}
        {myQuestions?.length === 0 && <NoQuestionMessage />}
        <div ref={setTarget} className="w-full h-[1px] shrink-0"></div>
        <div ref={endRef} className="w-full"></div>
      </div>

      <Link href="/interview/choice/setting">
        <Button
          color="blueSecondary"
          size="auto"
          text="sm"
          className="absolute bottom-8 right-8"
          disabled={disableBtn()}>
          N개 선택된 질문 보기
        </Button>
      </Link>
    </>
  );
}
