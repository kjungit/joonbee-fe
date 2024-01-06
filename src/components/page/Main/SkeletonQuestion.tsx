import { QuestionCard } from '@/components/common/QuestionCard';
import React from 'react';
import { COLOR_NUMBER } from './QuestionSection';

const skeletonData = Array.from({ length: 16 }, (_, index) => ({
  id: (index + 1).toString(),
  question: '',
}));

const skeletonDataI = {
  id: '0',
  categoryName: '',
  questions: [
    { questionId: '', questionContent: '' },
    { questionId: '', questionContent: '' },
  ],
  likeCount: '',
  thumbnail: '',
  memberId: '',
};

export default function SkeletonQuestion() {
  return (
    <ul className="flex flex-wrap gap-4 justify-between mt-10">
      {skeletonData.map((item, index) => (
        <QuestionCard
          key={item.id}
          size="md"
          color={COLOR_NUMBER.includes(index + 1) ? 'gray' : 'navy'}
          text=""
          // btnColor={COLOR_NUMBER.includes(index + 1) ? 'text-black' : 'text-white'}
        ></QuestionCard>
      ))}
    </ul>
  );
}
