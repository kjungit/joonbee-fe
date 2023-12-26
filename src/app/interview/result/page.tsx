import InterviewResult from '@/components/page/interview/result/InterviewResult';
import React from 'react';

export default function ResultPage() {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary">
      <section className="w-[1024px] h-[600px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px] relative">
        <h2 className="text-[20px] font-bold">면접 결과</h2>
        <InterviewResult />
      </section>
    </div>
  );
}
