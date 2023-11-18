import { DefaultValue, selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';

export const myQuestionClickSelector = selector<MyQuestion[]>({
  key: 'myQuestionClickSelector',
  get: ({ get }) => {
    return get(myQuestionAtom);
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
