import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import React from 'react';

type InterviewResultComProps = {
  gptOpinion?: string;
  children: React.ReactNode;
};

export default function InterviewResultCom({ gptOpinion, children }: InterviewResultComProps) {
  return (
    <>
      <div className="flex gap-2 items-center">
        <Image width={30} height={30} src="/icons/emoji/smile.png" alt="smile" />
        <h3 className="font-bold">전체적인 면접에 대한 느낌이에요.</h3>
      </div>
      <div
        className={`p-4 text-md h-[150px] overflow-auto bg-white rounded-2xl font-bold shadow-md break-words`}>
        {gptOpinion}
      </div>
      <div className="flex gap-2 items-center">
        <Image width={30} height={30} src="/icons/emoji/laugh.png" alt="laugh" />
        <h3 className="font-bold">개별 질문 정리</h3>
      </div>
      {children}
    </>
  );
}
