import React from 'react';
import { Icon } from '../icon';
import { Text, TextColor } from '../text';
import StepIcon from '../stepIcon';

type InterivewProgress =
  | 'InterviewSetting'
  | 'DeviceSetting'
  | 'InterviewConducting'
  | 'InterviewResult';

interface InterviewProgressBar {
  interview?: InterivewProgress;
  className?: string;
}

export default function InterviewProgressBar({
  interview = 'InterviewSetting',
  className = '',
}: InterviewProgressBar) {
  return (
    <div className={`flex gap-2 items-center h-[40px] ${className}`}>
      {interview === 'InterviewSetting' && (
        <>
          <StepIcon progress="DONE" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="PROGRESS" count={2} text="면접 설정" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={3} text="장치 설정" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={4} text="면접 진행" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={5} text="면접 결과" />
        </>
      )}
      {interview === 'DeviceSetting' && (
        <>
          <StepIcon progress="DONE" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={2} text="면접 설정" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="PROGRESS" count={3} text="장치 설정" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={4} text="면접 진행" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={5} text="면접 결과" />
        </>
      )}
      {interview === 'InterviewConducting' && (
        <>
          <StepIcon progress="DONE" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={2} text="면접 설정" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={3} text="장치 설정" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="PROGRESS" count={4} text="면접 진행" />
          <div className={`w-20 border-t-2 border-gray-normal`}></div>
          <StepIcon progress="READY" count={5} text="면접 결과" />
        </>
      )}
      {interview === 'InterviewResult' && (
        <>
          <StepIcon progress="DONE" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={2} text="면접 설정" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={3} text="장치 설정" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="DONE" count={4} text="면접 진행" />
          <div className={`w-20 border-t-2 border-[#4F7EEC]`}></div>
          <StepIcon progress="PROGRESS" count={5} text="면접 결과" />
        </>
      )}
    </div>
  );
}
