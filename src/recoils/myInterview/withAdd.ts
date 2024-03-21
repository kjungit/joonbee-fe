import { selector } from 'recoil';
import { myInterviewAtom } from './atom';

export const addQuestionSelector = selector({
  key: 'addQuestionSelector',
  get: ({ get }) => {
    const currentInterview = get(myInterviewAtom);
    return currentInterview.questions;
  },
  set: ({ set, get }, newValue) => {
    const questionToAdd = newValue as any;

    const currentInterview = get(myInterviewAtom);
    const updatedQuestions = [...currentInterview.questions, questionToAdd];

    set(myInterviewAtom, { ...currentInterview, questions: updatedQuestions });
  },
});
