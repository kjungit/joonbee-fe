import { selector } from 'recoil';
import { myInterviewAtom } from './atom';
import { MyInterviewQuestions } from '@/apis/services/openAiApis';

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
    const newQuestions = newValue as MyInterviewQuestions[];

    set(myInterviewAtom, prevInterview => ({
      ...prevInterview,
      questions: newQuestions,
    }));
  },
});

export const updateUserNameSelector = selector({
  key: 'updateUserNameSelector',
  get: ({ get }) => {
    const myInterview = get(myInterviewAtom);
    return myInterview.userName;
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'string') {
      set(myInterviewAtom, prevValue => ({
        ...prevValue,
        userName: newValue,
      }));
    }
  },
});

export const updateCategoryNameSelector = selector({
  key: 'updateCategoryNameSelector',
  get: ({ get }) => {
    const myInterview = get(myInterviewAtom);
    return myInterview.categoryName;
  },
  set: ({ set }, newValue) => {
    if (typeof newValue === 'string') {
      set(myInterviewAtom, prevValue => ({
        ...prevValue,
        categoryName: newValue,
      }));
    }
  },
});
