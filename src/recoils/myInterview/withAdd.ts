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

    // myInterviewState를 업데이트합니다.
    set(myInterviewState, { ...currentInterview, questions: updatedQuestions });
  },
});
