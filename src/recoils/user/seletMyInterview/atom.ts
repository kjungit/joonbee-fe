import { atom } from 'recoil';

export const selectMyInterviewState = atom({
  key: 'selectMyInterviewState',
  default: {
    categoryName: '',
    interviewId: 0,
    questionCount: 0,
  },
});
