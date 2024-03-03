import { atom } from 'recoil';

export type MyInterview = {
  questionId: string;
  questionContent: string;
  answerContent: string;
};

export const myInterviewAtom = atom<MyInterview[]>({
  key: 'myInterviewAtom',
  default: [],
});
