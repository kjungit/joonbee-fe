'use client';
import { selectInterviewState } from '@/recoils/home/interview/selectInterview/atom';
import Image from 'next/image';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'next/navigation';
import Logo from '@/components/@common/logo';
import { Text } from '@/components/@common/text';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import DetailInterviewInfoWrapper from './detailInterviewInfoWrapper';

export default function DetailInterviewSection() {
  const isNavbarOpen = useRecoilValue(NavbarIsOpenAtom);

  const selectInterview = useRecoilValue(selectInterviewState);
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <section
      className={`md:h-full block w-full ${
        selectInterview.categoryName !== '' && 'absolute md:static bg-white'
      }`}>
      <div className="md:flex hidden">
        {categoryParams === 'interview' && <DetailInterviewInfoWrapper />}
      </div>
      {categoryParams !== 'question' && selectInterview.categoryName === '' && (
        <div
          className={`md:mainBg md:w-full h-full flex  ${
            selectInterview.categoryName !== '' && 'hidden'
          }`}>
          <div
            className={`flex  flex-col gap-4 w-full items-center justify-center ${
              isNavbarOpen && 'md:min-w-[320px]'
            } ${(categoryParams || isNavbarOpen) && 'hidden'}`}>
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
    </section>
  );
}
