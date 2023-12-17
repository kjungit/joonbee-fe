import QuestionTypeBox from '@/components/page/interview/QuestionTypeBox';
import React from 'react';

export default function InterviewPage() {
  return (
    <div className="bg-main-primary w-full h-full flex justify-center items-center ">
      <div className="max-w-[1024px] w-full flex gap-14 justify-between">
        <QuestionTypeBox />
      </div>
    </div>
  );
}
