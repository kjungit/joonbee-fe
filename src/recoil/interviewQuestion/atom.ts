import { atom, useRecoilValue } from 'recoil';
import { CategoryName, SubcategoryName } from '@/types/question';

export type Question = {
  questionId: number;
  questionContent: string;
  answerContent: string;
};

export type InterviewQuestionState = {
  categoryName: CategoryName;
  questions: Question[];
};

export const interviewQuestionState = atom<InterviewQuestionState>({
  key: 'interviewQuestionState',
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
