'use client';

import Button from '@/components/@common/button/button';
import Dropdown from '@/components/@common/dropdown/dropdown';
import { Text } from '@/components/@common/text/text';
import { choiceInterviewCategoryAtom, interviewQuestionCountAtom } from '@/recoils/interview/atom';
import React from 'react';
import { useRecoilState } from 'recoil';

export default function ChoiceSettingPage() {
  const [selected, setSelected] = useRecoilState(choiceInterviewCategoryAtom);
  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);

  return (
    <section className="p-14">
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          전체 질문 카테고리를 선택해주세요
        </Text>
        <Dropdown data={['fe', 'be']} selected={selected} onSelect={setSelected} />
      </div>
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          질문 개수를 설정해주세요
        </Text>
        <div className="flex gap-10">
          <div className="w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
            질문 수
          </div>
          <div className="flex gap-5">
            <Button
              size="xs"
              color={questionCount === 2 ? 'primary' : 'white'}
              onClick={() => setQuestionCount(2)}>
              2
            </Button>
            <Button
              size="xs"
              color={questionCount === 4 ? 'primary' : 'white'}
              onClick={() => setQuestionCount(4)}>
              4
            </Button>
            <Button
              size="xs"
              color={questionCount === 6 ? 'primary' : 'white'}
              onClick={() => setQuestionCount(6)}>
              6
            </Button>
            <Button
              size="xs"
              color={questionCount === 8 ? 'primary' : 'white'}
              onClick={() => setQuestionCount(8)}>
              8
            </Button>
            <Button
              size="xs"
              color={questionCount === 10 ? 'primary' : 'white'}
              onClick={() => setQuestionCount(10)}>
              10
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <Text as="h3" size="lg" weight="lg" className="mb-2">
          개별 질문 시간을 설정해주세요
        </Text>
        <div className="flex gap-10">
          <div className="w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
            질문 시간
          </div>
          <div className="flex gap-5">
            <Button size="xs" color="white">
              1분
            </Button>
            <Button size="xs" color="white">
              1분 30초
            </Button>
            <Button size="xs" color="white">
              2분
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
