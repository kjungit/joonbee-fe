'use client';

import { useEffect, useState } from 'react';
import QuestionSettingButton from './QuestionSettingButton';
import { useRouter } from 'next/navigation';
import InterviewLoading from '@/components/ui/InterviewLoading';
import useBeforeUnload from '@/hooks/useBeforeUnload';

export default function InterviewRandomContainer() {
  const [isPressedBtn, setIsPressedBtn] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isPressedBtn) {
      setTimeout(() => {
        router.push('/interview/permission');
      }, 3000);
    }
  }, [isPressedBtn]);

  const onClick = () => {
    setIsPressedBtn(true);
  };

  useBeforeUnload();

  return (
    <>
      {!isPressedBtn ? (
        <section className="w-[1024px] h-[600px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px] relative">
          <h2 className="text-[20px] font-bold">랜덤 질문을 준비해주세요</h2>
          <QuestionSettingButton onClick={onClick} />
        </section>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <InterviewLoading interviewType="random" />
          <h2 className="text-white font-bold text-[20px]">랜덤 면접 질문을 준비중입니다!</h2>
        </div>
      )}
    </>
  );
}
