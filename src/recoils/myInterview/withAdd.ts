import { selector } from 'recoil';
import { myInterviewState } from './atom';

export const addQuestionSelector = selector({
  key: 'addQuestionSelector',
  get: ({ get }) => {
    const currentInterview = get(myInterviewState);
    return currentInterview.questions;
  },
  set: ({ set, get }, newValue) => {
    const questionToAdd = newValue as any;

    const currentInterview = get(myInterviewState);
    const updatedQuestions = [...currentInterview.questions, questionToAdd];

    set(myInterviewState, { ...currentInterview, questions: updatedQuestions });
  },
});
