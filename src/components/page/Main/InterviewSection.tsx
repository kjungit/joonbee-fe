'use client';
import InterviewCard from '@/components/common/InterviewCard';
import { RadiusButton } from '@/components/common/RadiusButton';
import Dropdown from '@/components/ui/Dropdown';
import { CategoryName } from '@/types/question';
import React, { useState } from 'react';

const data = [
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
  {
    id: '293x',
    category: '프론트엔드',
    questions: [
      { id: 'xd22', question: 'React의 장점은 무엇입니까?' },
      { id: 'fe22', question: 'React의 장점은 무엇입니까?' },
      { id: 'gw22', question: 'React의 장점은 무엇입니까?' },
    ],
    likeCount: 5,
    userInfo: {
      nickName: 'kimJaeWoo98',
      thunbnail: '',
    },
  },
];

export default function InterviewSection() {
  const [select, setSelect] = useState<CategoryName>('');
  return (
    <section className=" pt-8 flex flex-col bg-gray-light w-full items-center border-b-2 border-b-gray-primary ">
      <div className="w-[1200px]">
        <div>
          <Dropdown
            color="white"
            title="카테고리"
            size="md"
            selected={select}
            data={['프론트엔드', '백엔드', '언어', 'CS', '모바일', '기타']}
            onSelect={item => {
              setSelect(item);
            }}
          />
        </div>
        <ul className="flex flex-wrap justify-between">
          {data.map(i => (
            <li key={i.id} className="mt-8">
              <InterviewCard data={i} />
            </li>
          ))}
        </ul>
        <div className="flex justify-center my-12">
          <RadiusButton text="md" color="dark" size="sm" onClick={() => {}}>
            전체 질문 보기
          </RadiusButton>
        </div>
      </div>
    </section>
  );
}
