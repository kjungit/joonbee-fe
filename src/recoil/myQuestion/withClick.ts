import { DefaultValue, selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';

export const myQuestionClickSelector = selector<MyQuestion[]>({
  key: 'myQuestionClickSelector',
  get: ({ get }) => {
    const question = get(myQuestionAtom);
    return question.filter(question => question.isChecked === true);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return;
    }

    const currentQuestions = get(myQuestionAtom);

    const newQuestion = newValue[0];

    const updatedQuestions = currentQuestions.map(question =>
      question.questionId === newQuestion.questionId
        ? {
            ...question,
            isChecked: !question.isChecked,
          }
        : question,
    );

    set(myQuestionAtom, updatedQuestions);
  },
});
