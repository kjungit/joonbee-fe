'use client';

import LinkButton from '@/components/@common/linkButton';
import { Text } from '@/components/@common/text';
import useResetInterviewData from '@/hooks/useResetInterviewData';
import Image from 'next/image';
import React from 'react';

export default function RandomPage() {
  useResetInterviewData('random');

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
        <div className="w-[180px] h-[150px]">
          <Image src="/rope.png" alt="랜덤면접" width={180} height={180} />
        </div>
        <div>
          <Text size="lg" as="h4" weight="lg">
            질문을 AI가 준비해요
          </Text>
          <Text color="lightGray">
            무슨 문제가 나올지 몰라요! <br />
            예상하지 못한 문제를 준비해보세요!
          </Text>
        </div>
        <LinkButton size="xl" path="/interview/random/setting">
          면접 시작하기
        </LinkButton>
      </div>
    </>
  );
}
