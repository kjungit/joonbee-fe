'use client';
import { BetweenBox } from '@/components/common/BetweenBox';
import { DetailAnswerCard } from '@/components/common/DetailAnswerCard';
import { PolarChart } from '@/components/common/PolarChart';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import { Button } from '@/components/ui/Button';
import React from 'react';

interface DataProps {
  id: number;
  question: string;
  answer: string;
}

const data = [
  {
    id: 1,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 2,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 3,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 4,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 5,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 6,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  ,
  {
    id: 7,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
  {
    id: 8,
    question: 'React Life Cycle에 대해서 설명해주세요.',
    answer: '리액트의 생명주기는 mount, update, unmount 세가지의 주기를 가지고 있습니다.',
  },
] as DataProps[];

export default function MyPage() {
  const onClickCategory = (item: ItemProps) => {};

  return (
    <div className="bg-main-primary w-full h-full flex justify-center items-center">
      <div className="flex  gap-6  ">
        <div className="lg:h-[600px] 2xl:h-[700px] bg-white w-[300px] p-6  rounded-2xl flex flex-col items-center">
          <h3 className="text-xl font-bold w-full">프로필</h3>
          <div className="w-32 h-32 rounded-full bg-main-primary"></div>
          <p className="mt-4 text-xl font-bold">리액트척척박사</p>
          <div className="border-b-2 border-gray-light w-[80%] my-4"></div>

          <div className="flex flex-col gap-4">
            <BetweenBox first="면접 수" second="3" />
            <BetweenBox first="질문 수" second="3" />
          </div>
          <div className="border-b-2 border-gray-light w-[80%] my-4"></div>
          <p className="text-xl font-bold px-6 pb-2 w-full">내 면접 질문 통계</p>
        </div>
        <div className="flex flex-col justify-between gap-6 ">
          <div className="flex gap-6">
            <Button size="2md">면접 관리</Button>
            <Button size="2md">질문 관리</Button>
          </div>
          <div className="bg-white w-[880px] rounded-2xl p-6 h-full lg:h-[510px] 2xl:h-[620px]">
            <RadioButtonGroup
              size="sm"
              data={[
                { id: 1, text: '전체' },
                { id: 2, text: '내 면접' },
                { id: 3, text: '추천' },
              ]}
              onClickFunc={onClickCategory}
            />
            <ul className="flex flex-wrap mt-6 gap-4 overflow-y-scroll lg:h-[400px] 2xl:h-[520px]">
              {data &&
                data.map(i => (
                  <li key={i.id}>
                    <DetailAnswerCard answer={i.answer} question={i.question} onClick={() => {}} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
