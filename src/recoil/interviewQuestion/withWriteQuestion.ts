import { selector } from 'recoil';
import { Question, interviewQuestionState } from './atom';
import { CategoryName } from '@/types/question';

export const questionsSelector = selector({
  key: 'questionsSelector',
  get: ({ get }) => {
    const interviewQuestion = get(interviewQuestionState);
    return interviewQuestion.questions;
  },
  set: ({ set, get }, newValue) => {
    const currentQuestions = get(interviewQuestionState).questions;

    const updatedQuestion = {
      ...get(interviewQuestionState),
      questions: [...currentQuestions, ...(newValue as Question[])],
    };
    set(interviewQuestionState, updatedQuestion);
  },
});

export const categoryNameSelector = selector({
  key: 'categoryNameSelector',
  get: ({ get }) => {
    const interviewQuestion = get(interviewQuestionState);
    return interviewQuestion.categoryName;
  },
  set: ({ set, get }, newValue) => {
    const updatedCategoryName = {
      ...get(interviewQuestionState),
      categoryName: newValue as CategoryName,
    };

    set(interviewQuestionState, updatedCategoryName);
  },
});
