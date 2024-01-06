import InterviewCheck from '@/components/page/interview/check/InterviewCheck';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import React from 'react';

const InterviewCheckPage = () => {
  return (
    <div className="h-full flex justify-center items-center bg-main-primary">
      <section className="w-[1024px] h-[600px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px] relative">
        <h2 className="font-bold text-[20px]">답변 확인하기</h2>
        <InterviewCheck />
        <Link href="/interview/result">
          <Button color="blueSecondary" size="lg" text="sm" className="absolute bottom-8 right-8">
            다음
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default InterviewCheckPage;
