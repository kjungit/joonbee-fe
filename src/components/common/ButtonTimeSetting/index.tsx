'use client';

import { Button } from '@/components/ui/Button';
import { interviewTimeAtom } from '@/recoil/interviewTime/atom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function ButtonTimeSetting() {
  const [clickedTime, setClickedTime] = useRecoilState(interviewTimeAtom);

  const onClick = (time: number) => {
    setClickedTime(time);
  };

  return (
    <div className="flex gap-5">
      <Button color="darkNavy" text="sm">
        질문 시간 설정
      </Button>
      <Button
        color={`${clickedTime === 60 ? 'darkNavy' : 'white'}`}
        size="setting"
        text="sm"
        onClick={() => onClick(60)}>
        1분
      </Button>
      <Button
        color={`${clickedTime === 90 ? 'darkNavy' : 'white'}`}
        size="setting"
        text="sm"
        onClick={() => onClick(90)}>
        1분 30초
      </Button>
      <Button
        color={`${clickedTime === 120 ? 'darkNavy' : 'white'}`}
        size="setting"
        text="sm"
        onClick={() => onClick(120)}>
        2분
      </Button>
    </div>
  );
}
