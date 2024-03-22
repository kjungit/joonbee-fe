import React from 'react';
import QuestionProgress from '../@common/questionProgress';
import { useRecoilValue } from 'recoil';
import { currentCountAtom, interviewQuestionCountAtom } from '@/recoils/interview/atom';

export default function QuestionProgressMenu() {
  const questionCount = useRecoilValue(interviewQuestionCountAtom);
  const currentCount = useRecoilValue(currentCountAtom);

  return (
    <div className="p-4">
      {Array.from({ length: questionCount }, (_, i) => {
        const progressStatus =
          currentCount === i + 1 ? 'PROGRESS' : currentCount > i + 1 ? 'DONE' : 'READY';

        return (
          <QuestionProgress
            key={i}
            text={`질문 ${i + 1}`}
            className="mb-5"
            progressStatus={progressStatus}
          />
        );
      })}
    </div>
  );
}
