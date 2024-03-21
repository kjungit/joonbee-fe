import { atom } from 'recoil';

export const selectMyInterviewAtom = atom({
  key: 'selectMyInterviewAtom',
  default: {
    categoryName: '',
    interviewId: 0,
    questionCount: 0,
  },
});
