import { CategoryName } from '@/types';
import { atom } from 'recoil';

export const interviewTimeAtom = atom({
  key: 'interviewTimeAtom',
  default: 60,
});

export const interviewQuestionCountAtom = atom({
  key: 'interviewQuestionCountAtom',
  default: 2,
});

export const choiceInterviewCategoryAtom = atom<CategoryName>({
  key: 'choiceInterviewCategoryAtom',
  default: 'fe',
});
