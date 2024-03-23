import React from 'react';
import Button from '../button';
import { useRecoilState } from 'recoil';
import { interviewTimeAtom } from '@/recoils/interview/atom';
import { Text } from '../text';

export default function QuestionTimeButtonGroup() {
  const [time, setTime] = useRecoilState(interviewTimeAtom);

  return (
    <div className="mb-5">
      <Text as="h3" size="lg" weight="lg" className="mb-2">
        개별 질문 시간을 설정해주세요
      </Text>
      <div className="flex gap-10">
        <p className="min-w-[142px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md">
          질문 시간
        </p>
        <div className="flex gap-5">
          <Button size="xs" color={time === 60 ? 'primary' : 'white'} onClick={() => setTime(60)}>
            1분
          </Button>
          <Button size="xs" color={time === 90 ? 'primary' : 'white'} onClick={() => setTime(90)}>
            1분 30초
          </Button>
          <Button size="xs" color={time === 120 ? 'primary' : 'white'} onClick={() => setTime(120)}>
            2분
          </Button>
        </div>
      </div>
    </div>
  );
}
