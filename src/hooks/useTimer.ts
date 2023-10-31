import React, { useEffect, useState } from 'react';

const useTimer = (time: number) => {
  const [remainingTime, setRemainingTime] = useState(time);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer);
        setIsCompleted(true);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingTime]);

  return { remainingTime, isCompleted };
};

export default useTimer;
