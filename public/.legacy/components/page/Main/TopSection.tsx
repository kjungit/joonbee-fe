'use client';
import { LinkBox } from '../../common/LinkBox';
import { isLoginedStatus } from '../../../recoil/isLogined/atom';
import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

export default function TopSection() {
  const [isLogined, setisLogined] = useRecoilState(isLoginedStatus);

  return (
    <section className=" px-5 w-full max-w-[1024px] mainBg flex flex-col items-center min-h-[480px] ">
      <div className=" w-full flex-grow items-center">
        <p className="z-10 w-full  pt-10 font-bold flex max-w-[1024px] text-lg ">AI 면접 서비스</p>
        <div className="flex w-full h-[330px] max-h-[340px] md:flex-row flex-col max-w-[1024px] items-center justify-center gap-4 md:gap-10  flex-grow">
          <LinkBox size="md" color="navy" title="AI면접 시작하기" propsLink="/interview">
            <Image
              src="/icons/ai_white.png"
              alt="ai_white"
              width={100}
              height={100}
              className="w-20 lg:w-28"
            />
          </LinkBox>
          <div className="flex flex-row md:flex-col gap-4 md:gap-10 w-full justify-between  flex-grow">
            <LinkBox
              size="sm"
              title="나의 면접 관리하기"
              propsLink={isLogined ? '/my?category=interview&sort=my_interview' : '/login'}>
              <Image
                src="/icons/meeting.png"
                alt="ai_white"
                width={100}
                height={100}
                className="w-14  lg:w-20"
              />
            </LinkBox>
            <LinkBox
              size="sm"
              title="나의 질문 확인하기"
              propsLink={isLogined ? '/my?category=question' : '/login'}>
              <Image
                src="/icons/service.png"
                alt="ai_white"
                width={100}
                height={100}
                className="w-14 lg:w-20"
              />
            </LinkBox>
          </div>
        </div>
      </div>
      <h3 className=" w-full font-bold text-2xl text-start max-w-[1024px] leading-10 ">
        다른 사람들은 어떤 질문으로 준비하고 있을까요?
      </h3>
    </section>
  );
}
