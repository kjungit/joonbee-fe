import React from 'react';
import Button from '../button';
import { useRecoilState } from 'recoil';
import { interviewTimeAtom } from '@/recoils/interview/atom';
import { Text } from '../text';

export default function QuestionTimeButtonGroup() {
  const [time, setTime] = useRecoilState(interviewTimeAtom);

  return (
    <div className="mb-4">
      <Text as="h3" size="lg" className="mb-2">
        개별 질문 시간을 설정해주세요
      </Text>
      <div className="flex gap-10">
        <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
          질문 시간
        </p>
        <div className="flex gap-5">
          <Button
            size="sm3"
            color={time === 60 ? 'primary' : 'white'}
            onClick={() => setTime(60)}
            className="shadow-md">
            1분
          </Button>
          <Button
            size="sm3"
            color={time === 90 ? 'primary' : 'white'}
            onClick={() => setTime(90)}
            className="shadow-md">
            1분 30초
          </Button>
          <Button
            size="sm3"
            color={time === 120 ? 'primary' : 'white'}
            onClick={() => setTime(120)}
            className="shadow-md">
            2분
          </Button>
        </div>
      </div>
    </div>
  );
}
