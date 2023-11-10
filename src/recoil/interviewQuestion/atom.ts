import { atom, useRecoilState } from 'recoil';

export const interviewQuestionState = atom({
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
