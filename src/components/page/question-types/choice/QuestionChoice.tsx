'use client';

import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import QuestionForm from '@/components/common/QuestionForm';
import { Button } from '@/components/ui/Button';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import { myQuestionClickSelector } from '@/recoil/myQuestion/withClick';
import { myQuestionFilterSelector } from '@/recoil/myQuestion/withFilter';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function QuestionChoice() {
  const questions = useRecoilValue(myQuestionFilterSelector);
  const filteredQuestion = useRecoilValue(myQuestionClickSelector);
  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] relative">
      <h2 className="text-[32px] font-bold">질문을 준비해주세요</h2>
      <QuestionForm />
      <div className="flex flex-col gap-5 scroll-hide overflow-y-scroll pb-2">
        {questions.map(question => (
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
      </div>
      <div className="h-[80px]">
        <Button color="blueSecondary" size="lg" className="absolute bottom-9 right-[50px]">
          {filteredQuestion.length}개 선택된 질문 보기
        </Button>
      </div>
    </section>
  );
}
