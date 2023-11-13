import { TimerState } from '@/types';
import React, { useEffect, useState } from 'react';

const useTimer = (
  time: number,
  timerState: TimerState,
  setTimerState: (state: TimerState) => void,
) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    if (timerState === 'READY') setRemainingTime(time);
    if (timerState === 'PROGRESS') {
      const timer = setInterval(() => {
        if (remainingTime > 0) {
          setTimerState('PROGRESS');
          setRemainingTime(remainingTime - 1);
        } else {
          setTimerState('DONE');
          clearInterval(timer);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime, timerState]);

  return { remainingTime };
};

export default useTimer;
