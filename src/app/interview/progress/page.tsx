import InterviewScreen from '@/components/page/interview/progress/InterviewScreen';
import React, { useRef } from 'react';

const InterviewProgressPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-main-primary">
      <section className="w-[1024px] h-[600px] flex flex-col gap-5 bg-background-lightgray p-8 rounded-[40px]">
        <InterviewScreen />
      </section>
    </div>
  );
};

export default InterviewProgressPage;
