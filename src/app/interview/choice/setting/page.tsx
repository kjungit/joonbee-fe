import QuestionChocieSetting from '@/components/page/interview/choice/setting/QuestionChocieSetting';
import React from 'react';

export default function SettingPage() {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary">
      <section className="w-[1024px] h-[600px] flex flex-col gap-4 bg-background-lightgray p-8  rounded-[40px] relative">
        <h2 className="text-[20px] font-bold">면접 전 설정해주세요</h2>
        <QuestionChocieSetting />
      </section>
    </div>
  );
}
