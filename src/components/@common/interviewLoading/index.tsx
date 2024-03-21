import Image from 'next/image';
import React from 'react';

type InterviewLoadingProps = {
  interviewType: 'random' | 'choice';
};

export default function InterviewLoading({ interviewType }: InterviewLoadingProps) {
  return (
    <div className="rounded-full overflow-hidden">
      {interviewType === 'choice' ? (
        <Image src={'/ai_load.gif'} width={100} height={100} alt="loading" />
      ) : (
        <Image src={'/random_load.gif'} width={300} height={300} objectFit="cover" alt="loading" />
      )}
    </div>
  );
}
