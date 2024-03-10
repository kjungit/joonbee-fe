import QuestionTypeBox from '../../components/page/interview/QuestionTypeBox';
import React from 'react';

export default function InterviewPage() {
  return (
    <div className="bg-main-primary w-full origin-h flex justify-center items-center ">
      <div className="max-w-[1024px] min-w-[340px] w-full xs:flex px-10 xs:gap-6   md:gap-14 justify-between mx-auto">
        <QuestionTypeBox />
      </div>
    </div>
  );
}
