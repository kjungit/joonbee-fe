import React, { useEffect, useState } from 'react';

export default function useLoadingProgress(isLoaded: boolean) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout;

    const updatePercent = () => {
      setPercent(oldPercent => {
        if (oldPercent >= 100) {
          clearInterval(interval);
          return 100;
        }

        if (oldPercent >= 93 && isLoaded) {
          clearInterval(interval);
          return 100;
        }

        return oldPercent + 1;
      });
    };

    const adjustInterval = () => {
      clearInterval(interval);

      switch (true) {
        case percent >= 15 && percent < 33:
          interval = setInterval(updatePercent, 300);
          break;
        case percent >= 33 && percent < 51:
          interval = setInterval(updatePercent, 500);
          break;
        case percent >= 52 && percent < 60:
          interval = setInterval(updatePercent, 800);
          break;
        case percent >= 60 && percent < 70:
          interval = setInterval(updatePercent, 700);
          break;
        case percent >= 70 && percent < 93:
          interval = setInterval(updatePercent, 1000);
          break;
        default:
          interval = setInterval(updatePercent, 200);
          break;
      }
    };

    adjustInterval();

    const intervalForIsLoaded = setInterval(() => {
      if (isLoaded) {
        setPercent(100);
        clearInterval(intervalForIsLoaded);
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(intervalForIsLoaded);
    };
  }, [percent, isLoaded]);
  return percent;
}
