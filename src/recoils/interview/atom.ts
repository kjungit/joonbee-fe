import { CategoryName } from '@/types';
import { atom } from 'recoil';

export const InterviewCategoryAtom = atom<CategoryName>({
  key: 'InterviewCategoryAtom',
  default: 'fe',
});

export const interviewQuestionCountAtom = atom({
  key: 'interviewQuestionCountAtom',
  default: 2,
});
export const interviewTimeAtom = atom({
  key: 'interviewTimeAtom',
  default: 60,
});
