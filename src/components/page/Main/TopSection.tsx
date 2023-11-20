import { LinkBox } from '@/components/common/LinkBox';
import React from 'react';

export default function TopSection() {
  return (
    <section className=" h-[560px]  mainBg justify-between flex flex-col items-center ">
      <p className="z-10 w-[1200px] font-bold text-lg pt-20">AI 면접 서비스</p>
      <div className="z-10 flex gap-10 pb-20">
        <div className="">
          <LinkBox
            size="md"
            color="navy"
            title="AI면접 시작하기"
            propsLink="/interview"
            iconSrc="ai_white"
          />
        </div>
        <div className="flex flex-col gap-10">
          <LinkBox size="sm" title="나의 질문 관리하기" propsLink="/" iconSrc="service" />
          <LinkBox size="sm" title="나의 질문 확인하기" propsLink="/" iconSrc="meeting" />
        </div>
      </div>
      <h3 className="z-10 pb-4 font-bold text-2xl text-start w-[1200px] ">
        다른 사람들은 어떤 질문으로 준비하고 있을까요?
      </h3>
    </section>
  );
}
