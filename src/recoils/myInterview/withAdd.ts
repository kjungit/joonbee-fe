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

export const addQuestionListSelector = selector({
  key: 'addQuestionListSelector',
  get: ({ get }) => {
    const currentInterview = get(myInterviewAtom);
    return currentInterview.questions;
  },
  set: ({ set }, newValue) => {
    // newValue를 새로운 questions 배열로 처리합니다.
    const newQuestions = newValue as any[]; // 새로운 배열의 타입에 맞게 조정하세요.

    // myInterviewAtom을 업데이트하여 questions만 새로운 배열로 대체합니다.
    set(myInterviewAtom, prevInterview => ({
      ...prevInterview,
      questions: newQuestions,
    }));
  },
});
