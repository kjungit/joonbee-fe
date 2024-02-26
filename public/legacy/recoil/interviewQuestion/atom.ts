import { atom } from 'recoil';
import { CategoryName } from '@/types/question';

export type Question = {
  questionId: number;
  questionContent: string;
  answerContent: string;
};

export type Interview = {
  categoryName: CategoryName;
  questions: Question[];
};

export const interviewAtom = atom<Interview>({
  key: 'interviewAtom',
  default: {
    categoryName: '',
    questions: [],
  },
});
