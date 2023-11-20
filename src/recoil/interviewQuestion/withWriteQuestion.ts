import { selector } from 'recoil';
import { Question, interviewQuestionAtom } from './atom';
import { CategoryName } from '@/types/question';

export const questionsSelector = selector({
  key: 'questionsSelector',
  get: ({ get }) => {
    const interviewQuestion = get(interviewQuestionAtom);
    return interviewQuestion.questions;
  },
  set: ({ set, get }, newValue) => {
    const currentQuestions = get(interviewQuestionAtom).questions;

    const updatedQuestion = {
      ...get(interviewQuestionAtom),
      questions: [...currentQuestions, ...(newValue as Question[])],
    };
    set(interviewQuestionAtom, updatedQuestion);
  },
});

export const categoryNameSelector = selector({
  key: 'categoryNameSelector',
  get: ({ get }) => {
    const interviewQuestion = get(interviewQuestionAtom);
    return interviewQuestion.categoryName;
  },
  set: ({ set, get }, newValue) => {
    const updatedCategoryName = {
      ...get(interviewQuestionAtom),
      categoryName: newValue as CategoryName,
    };

    set(interviewQuestionAtom, updatedCategoryName);
  },
});
