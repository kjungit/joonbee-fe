import QuestionChoice from '@/components/page/interview/choice/QuestionChoice';
import React from 'react';

export default function ChoicePage() {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary">
      <section className="w-[1024px] h-[706px] flex flex-col gap-5 bg-background-lightgray p-8  rounded-[40px] relative">
        <h2 className="text-[20px] font-bold">질문을 준비해주세요</h2>
        <QuestionChoice />
      </section>
    </div>
  );
}
