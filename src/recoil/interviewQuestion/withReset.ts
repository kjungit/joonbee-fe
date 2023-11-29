import { selector } from 'recoil';
import { myQuestionAtom } from '../myQuestion/atom';
import { selectedCategoryAtom } from '../selectedCategory/atom';
import { interviewAtom } from './atom';

export const interviewResetSelector = selector({
  key: 'interviewResetSelector',
  get: ({ get }) => {
    const questions = get(myQuestionAtom);
    const filterdQuestions = questions.filter(question => question.isChecked === true);

    const updatedQuestions = filterdQuestions.map(question => ({
      questionId: question.questionId,
      questionContent: question.questionContent,
      answerContent: '',
    }));

    const updatedInterview = {
      categoryName: get(selectedCategoryAtom),
      questions: updatedQuestions,
    };

    return updatedInterview;
  },
  set: ({ get, set }) => {
    const questions = get(myQuestionAtom);
    const filterdQuestions = questions.filter(question => question.isChecked === true);

    const updatedQuestions = filterdQuestions.map(question => ({
      questionId: question.questionId,
      questionContent: question.questionContent,
      answerContent: '',
    }));

    const updatedInterview = {
      categoryName: get(selectedCategoryAtom),
      questions: updatedQuestions,
    };

    set(interviewAtom, updatedInterview);
  },
});
