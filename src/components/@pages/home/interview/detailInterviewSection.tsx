'use client';
import { MainCategory } from '@/constants/category';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { InterviewLikeIcon } from './interviewLikeIcon';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/@common/logo';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';

export default function DetailInterviewSection() {
  const selectInterview = useRecoilValue(selectInterviewState);
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  useEffect(() => {
    console.log(selectInterview);
    console.log(categoryParams);
  }, [selectInterview]);

  return (
    <section className=" h-full  w-full  ">
      {categoryParams !== 'question' && selectInterview.categoryName === '' && (
        <div className="mainBg flex w-full h-full ">
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <Logo size="lg" />
            <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} />
            <div className="flex flex-col items-center gap-1">
              <Text size="xl" weight="lg" className="text-blue-normal text-center">
                개발자를 위한 AI 면접서비스
              </Text>
              <Text size="xl" weight="lg" className="text-blue-normal text-center">
                랜덤질문 및 질문을 선택해서 기술면접을 준비해보세요!
              </Text>
            </div>
          </div>
        </div>
      )}

      <div>
        {categoryParams === 'interview' && (
          <div>
            <div className="flex gap-4 p-4 items-center">
              <div>
                <Image
                  className="rounded-full"
                  width={28}
                  height={28}
                  src={selectInterview.thumbnail}
                  alt={selectInterview.nickname + ' imgae'}
                />
              </div>
              <Text size="lg" weight="lg">
                {MainCategory[selectInterview.categoryName]}
              </Text>
              <div className="flex gap-1 items-center justify-center">
                <InterviewLikeIcon
                  interviewId={selectInterview.interviewId}
                  liked={selectInterview.liked}
                />
                <Text size="lg" weight="lg" className="p-1">
                  {selectInterview.likeCount}
                </Text>
              </div>
            </div>
            <ul className="flex flex-col p-6 gap-4">
              {selectInterview.questions.map(item => (
                <div key={item.questionId} className="flex gap-2 leading-5 items-center">
                  <VariableIcon name="questionBox" size={16} className="leading-5" />
                  <Text size="lg" weight="md">
                    {item.questionContent}
                  </Text>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
