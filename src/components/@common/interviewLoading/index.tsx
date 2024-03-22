import Image from 'next/image';
import React from 'react';

interface InterviewLoadingProps {
  interviewType?: 'random' | 'choice';
}

export default function InterviewLoading({ interviewType = 'choice' }: InterviewLoadingProps) {
  return (
    <div className="rounded-full overflow-hidden">
      {interviewType === 'choice' ? (
        <Image src={'/ai_load.gif'} width={100} height={100} alt="loading" />
      ) : (
        <Image src={'/random_load.gif'} width={100} height={100} alt="loading" />
      )}
    </div>
  );
}
