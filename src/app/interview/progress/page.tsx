'use client';
import React, { useEffect, useState } from 'react';
import useGetInterviewData from '@/hooks/interview/useGetInterviewData';
import Video from '@/components/@common/video/video';
import useVideo from '@/hooks/interview/useVideo';
import useTimer from '@/hooks/interview/useTimer';
import { ProgressStatus } from '@/types';
import { VariableIcon } from '@/components/@common/variableIcon';
import { Text } from '@/components/@common/text';
import Button from '@/components/@common/button';
import TextArea from '@/components/@common/textArea';

export default function ProgressPage() {
  const [currentCount, setCurrentCount] = useState<number>(1);
  const [progressStatus, setProgressStatus] = useState<ProgressStatus>('READY');

  const { questionData } = useGetInterviewData();
  const { videoRef, onStartVideo, onStartRecord, onStopRecord, onToggleRecord } = useVideo();
  const { remainingTime } = useTimer(progressStatus, setProgressStatus);

  console.log(questionData);

  useEffect(() => {
    onStartVideo();
  }, []);

  return (
    <>
      <Text size="xl" className="mb-5">
        질문 {currentCount}
      </Text>
      <div className="flex gap-10 mb-10">
        <Video videoRef={videoRef} />
        <div className="flex flex-col justify-between">
          <div className="bg-blue-light rounded-md w-[234px] h-[48px] flex justify-center">
            <div className="flex items-center gap-5 ">
              <Text className="text-[18px]">남은시간</Text>
              <Text weight="lg" className="text-[18px]">
                {remainingTime}
              </Text>
            </div>
          </div>
          <Button size="xl">시작하기</Button>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <VariableIcon name="triangleRight" />
        <Text size="lg">질문 {currentCount}</Text>
      </div>

      <TextArea />
    </>
  );
}
