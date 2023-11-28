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

export default function QuestionChoice() {
  const filteredQuestions = useRecoilValue(myQuestionFilterSelector);
  const clickedQuestions = useRecoilValue(myQuestionClickSelector);

  const onDisabledButton = () => {
    if (clickedQuestions.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] relative">
      <h2 className="text-[32px] font-bold">질문을 준비해주세요</h2>
      <QuestionForm />
      <div
        className={`flex flex-col gap-5 scroll-hide overflow-y-scroll pb-2 items-center h-[70%] ${
          filteredQuestions.length === 0 && 'justify-center'
        }`}>
        {filteredQuestions.map(question => (
          <CategorizedQuestionCard
            questionId={question.questionId}
            categoryName={question.categoryName}
            subcategoryName={question.subcategoryName}
            questionContent={question.questionContent}
            isChecked={question.isChecked}
            key={question.questionId}
            size="lg"
          />
        ))}
        {filteredQuestions.length === 0 && <NoQuestionMessage />}
      </div>

      <Link href="/interview/choice/setting">
        <Button
          color="blueSecondary"
          size="lg"
          className="absolute bottom-9 right-[50px]"
          disabled={onDisabledButton()}>
          {clickedQuestions.length}개 선택된 질문 보기
        </Button>
      </Link>
    </section>
  );
}
