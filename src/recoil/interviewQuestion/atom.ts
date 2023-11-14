import { atom, useRecoilState } from 'recoil';

type Question = {
  questionId: number;
  subcategory: string;
  questionContent: string;
  answerContent: string;
};

type InterviewQuestionState = {
  categoryName: string;
  questions: Question[];
};

export const interviewQuestionState = atom<InterviewQuestionState>({
  key: 'interviewQuestionState',
  default: {
    categoryName: '프론트엔드',
    questions: [
      {
        questionId: 1,
        subcategory: 'TypeScript',
        questionContent: 'TypeScript의 장점에 대해 설명하세요.',
        answerContent: '',
      },
      {
        questionId: 2,
        subcategory: 'JavaScript',
        questionContent: 'JavaScript의 동작원리에 대해 설명하세요.',
        answerContent: '',
      },
    ],
  },
});
