'use client';

import ButtonTimeSetting from '@/components/common/ButtonTimeSetting';
import { CategorizedQuestionCard } from '@/components/common/CategorizedQuestionCard';
import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import { myCategoryAddSelector } from '@/recoil/myQuestion/withAddCategory';
import { myQuestionClickSelector } from '@/recoil/myQuestion/withClick';
import { CategoryName } from '@/types/question';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function QuestionChocieSetting() {
  const [selected, setSelected] = useState<CategoryName>('');
  const questions = useRecoilValue(myQuestionClickSelector);
  const categories = useRecoilValue(myCategoryAddSelector);

  const onDisabledButton = () => {
    return !selected ? true : false;
  };

  return (
    <section className="w-[1200px] h-[90%] flex flex-col gap-5 bg-background-lightgray px-[50px] py-[40px] rounded-[40px] relative">
      <h2 className="text-[32px] font-bold">면접 전 설정해주세요</h2>
      <div className="flex gap-5 items-center">
        <Dropdown color="white" selected={selected} onSelect={setSelected} data={categories} />
        <p className="font-bold text-[20px]">전체 질문 카테고리를 선택해주세요</p>
      </div>
      <div
        className={`flex flex-col gap-5 scroll-hide overflow-y-scroll pb-2 items-center h-[60%] ${
          questions.length === 0 && 'justify-center'
        }`}>
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
      <div className="absolute bottom-40">
        <p className="text-[#7D7D7D] mb-2">* 개별 질문당 시간을 설정해주세요</p>
        <ButtonTimeSetting />
      </div>
      <Link href="/interview/permission">
        <Button
          color="blueSecondary"
          size="lg"
          className="absolute bottom-9 right-[50px]"
          disabled={onDisabledButton()}>
          면접 시작하기
        </Button>
      </Link>
    </section>
  );
}
