'use client';
import React, { useEffect, useState } from 'react';
import { interviewTypeAtom } from '@/recoils/interview/atom';
import { useRecoilValue } from 'recoil';
import useGetInterviewData from '@/hooks/interview/useGetInterviewData';
import { Text } from '@/components/@common/text/text';
import Video from '@/components/@common/video/video';
import useVideo from '@/hooks/interview/useVideo';
import Button from '@/components/@common/button/button';
import useTimer from '@/hooks/interview/useTimer';
import { ProgressStatus } from '@/types';

export default function ProgressPage() {
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>('READY');

  const { questionData } = useGetInterviewData();
  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onToggleRecord } = useVideo();
  const { remainingTime } = useTimer(progressStatus, setProgressStatus);

  useEffect(() => {
    onStartVideo();
  }, []);

  return (
    <>
      <Text size="xl" className="mb-5">
        질문 {currentCount}
      </Text>
      <div>
        <Video videoRef={videoRef} />
        <div>
          <div className="bg-blue-light rounded-md w-[230px] h-[48px]">
            <div className="flex items-center gap-5">
              <Text size="lg">남은시간</Text>
              <Text size="xl">{remainingTime}</Text>
            </div>
          </div>
          <Button size="xl">시작하기</Button>
        </div>
      </div>
    </>
  );
}
