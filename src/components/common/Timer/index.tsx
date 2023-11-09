'use client';

import useTimer from '@/hooks/useTimer';
import React from 'react';

type TimerProps = {
  time?: number;
};

const Timer = ({ time = 60 }: TimerProps) => {
  const baseStyles = `w-[174px] h-[174px] rounded-full relative flex justify-center items-center`;

  const { remainingTime, isCompleted } = useTimer(time);

  return (
    <div className="w-[180px] h-[180px] relative">
      <svg className="circle">
        <circle
          className="border"
          style={{
            stroke: '#4374F3',
            strokeWidth: '8',
            fill: 'transparent',
            strokeDashoffset: '500',
            strokeDasharray: '0',
            animation: `${time}s circletimer linear`,
          }}
          cx="90"
          cy="90"
          r="80"
        />
      </svg>
      <span className="timer">{remainingTime}</span>
    </div>
  );
};

export default Timer;
