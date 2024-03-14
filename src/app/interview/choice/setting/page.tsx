'use client';

import Button from '@/components/@common/button/button';
import Dropdown from '@/components/@common/dropdown/dropdown';
import IconButton from '@/components/@common/iconButton/iconButton';
import { mainCategoryList } from '@/constants/category';
import {
  InterviewCategoryAtom,
  interviewQuestionCountAtom,
  interviewTimeAtom,
} from '@/recoils/interview/atom';
import { Text } from '@/components/@common/text/text';
import React from 'react';
import { useRecoilState } from 'recoil';
import InterviewLoading from '@/components/@common/interviewLoading/interviewLoading';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';

export default function ChoiceSettingPage() {
  const [selected, setSelected] = useRecoilState(InterviewCategoryAtom);
  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);
  const [time, setTime] = useRecoilState(interviewTimeAtom);
  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/permission');

  return (
    <>
      {!isPressedBtn ? (
        <>
          <div className="mb-5">
            <Text as="h3" size="lg" weight="lg" className="mb-2">
              전체 질문 카테고리를 선택해주세요
            </Text>
            <Dropdown data={mainCategoryList} selected={selected} onSelect={setSelected} />
          </div>
          <div className="mb-5">
            <Text as="h3" size="lg" weight="lg" className="mb-2">
              질문 개수를 설정해주세요
            </Text>
            <div className="flex gap-10">
              <p className="min-w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
                질문 수
              </p>
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
              <p className="min-w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
                질문 시간
              </p>
              <div className="flex gap-5">
                <Button
                  size="xs"
                  color={time === 60 ? 'primary' : 'white'}
                  onClick={() => setTime(60)}>
                  1분
                </Button>
                <Button
                  size="xs"
                  color={time === 90 ? 'primary' : 'white'}
                  onClick={() => setTime(90)}>
                  1분 30초
                </Button>
                <Button
                  size="xs"
                  color={time === 120 ? 'primary' : 'white'}
                  onClick={() => setTime(120)}>
                  2분
                </Button>
              </div>
            </div>
          </div>
          <IconButton
            iconName="next_arrow.png"
            edge="end"
            size="md"
            className="absolute bottom-0"
            onClick={onMovePage}>
            다음 단계
          </IconButton>
        </>
      ) : (
        <InterviewLoading />
      )}
    </>
  );
}
