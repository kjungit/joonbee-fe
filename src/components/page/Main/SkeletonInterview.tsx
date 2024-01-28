import { QuestionCard } from '@/components/common/QuestionCard';
import React from 'react';

const skeletonData = Array.from({ length: 6 }, (_, index) => ({
  id: (index + 1).toString(),
  categoryName: '',
  questions: Array.from({ length: 3 }, (_, idx) => ({
    questionId: (idx + 1).toString(),
    questionContent: '',
  })),
  likeCount: '',
  thumbnail: '',
  memberId: '',
}));

export default function SkeletonInterview() {
  return (
    <ul className="flex flex-wrap justify-between animate-pulse w-full">
      {skeletonData.map(item => (
        <li key={item.id} className="mt-8 w-full max-w-[320px]">
          <button
            className={` max-w-[330px] w-full flex-grow h-[392px] shadow-normal rounded-[20px] border-4 border-gray-normal`}>
            <div className="bg-[#252A32] h-[70px] p-[24px] shadow-normal rounded-t-[16px]">
              <h2 className="text-white text-[16px] font-bold"></h2>
            </div>
            <div className="h-[242px] px-[10px] py-[16px] flex flex-col items-center justify-between">
              <ul className="flex flex-col gap-2 w-full">
                {item.questions.map((question: any, index) => (
                  <QuestionCard key={question.id} text=""></QuestionCard>
                ))}
              </ul>
              <div></div>
            </div>
            <div className="flex justify-between items-center rounded-b-[20px] h-[80px] border-t border-t-gray-normal px-[28px] py-[12px]">
              <div className="flex gap-2"></div>
              <div className="flex gap-2">
                <p className="font-bold text-[16px]">{}</p>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
