import { CategoryName, InterviewType } from '@/types';
import { atom } from 'recoil';

export const InterviewCategoryAtom = atom<CategoryName>({
  key: 'InterviewCategoryAtom',
  default: 'fe',
});

export const interviewQuestionCountAtom = atom<number>({
  key: 'interviewQuestionCountAtom',
  default: 2,
});
export const interviewTimeAtom = atom<number>({
  key: 'interviewTimeAtom',
  default: 60,
});

export const interviewVideoUrlAtom = atom<string>({
  key: 'interviewVideoUrlAtom',
  default: '',
});

export const interviewTypeAtom = atom<InterviewType>({
  key: 'interviewTypeAtom',
  default: 'random',
});
