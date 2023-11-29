'use client';
import { DetailAnswerCard } from '@/components/common/DetailAnswerCard';
import { ItemProps, RadioButtonGroup } from '@/components/common/RadioButtonGroup';
import Profile from '@/components/page/My/Profile';
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
        <Profile />
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
