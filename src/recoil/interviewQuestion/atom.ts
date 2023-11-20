import { atom } from 'recoil';
import { CategoryName } from '@/types/question';

export type Question = {
  questionId: number;
  questionContent: string;
  answerContent: string;
};

export type InterviewQuestion = {
  categoryName: CategoryName;
  questions: Question[];
};

export const interviewQuestionAtom = atom<InterviewQuestion>({
  key: 'interviewQuestionAtom',
  default: {
    categoryName: '프론트엔드',
    questions: [
      {
        questionId: 1,
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
    ],
  },
});
