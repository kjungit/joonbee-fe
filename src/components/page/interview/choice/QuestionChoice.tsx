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
import { UserQuestionsResponseData } from '@/app/apis/services/cart';

export default function QuestionChoice() {
  const category = useRecoilValue(selectedCategoryAtom);
  const subcategory = useRecoilValue(selectedSubcategoryAtom);
  const [questionContent, setQuestionContent] = useState('');

  const {
    newData: myQuestions,
    setTarget,
    setSize,
  } = useInfiniteUserQuestion(category, subcategory);

  const disableBtn = () => {
    if (myQuestions?.length === 0) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* <button onClick={() => setSize(prev => prev + 1)}>테스트</button> */}
      <QuestionForm questionContent={questionContent} setQuestionContent={setQuestionContent} />
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
        <div ref={setTarget} className="w-full h-[100px] bg-status-alert"></div>
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
