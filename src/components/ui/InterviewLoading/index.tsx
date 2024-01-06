import Image from 'next/image';
import React from 'react';

type InterviewLoadingProps = {
  interviewType: 'random' | 'chocie';
};

export default function InterviewLoading({ interviewType }: InterviewLoadingProps) {
  return (
    <div className="rounded-full overflow-hidden">
      {interviewType === 'chocie' ? (
        <Image src={'/ai_load.gif'} width={250} height={250} alt="loading" />
      ) : (
        <Image src={'/random_load.gif'} width={300} height={300} objectFit="cover" alt="loading" />
      )}
    </div>
  );
}
