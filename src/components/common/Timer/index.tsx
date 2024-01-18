'use client';

import useTimer from '@/hooks/useTimer';
import { TimerState } from '@/types';
import React from 'react';

type TimerProps = {
  time?: number;
  timerState: TimerState;
  remainingTime: number;
};

const Timer = ({ time = 60, timerState, remainingTime }: TimerProps) => {
  return (
    <div className="w-[180px] h-[180px] relative border-2 rounded-full border-blue-primary">
      {timerState === 'PROGRESS' && (
        <svg className="circle ">
          <circle
            className="border "
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
      )}

      <span className="timer">{remainingTime}</span>
    </div>
  );
};

export default Timer;
