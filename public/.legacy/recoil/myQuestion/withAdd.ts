import { selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';

export const myQuestionAddSelector = selector<MyQuestion[]>({
  key: 'myQuestionAddSelector',
  get: ({ get }) => {
    return get(myQuestionAtom);
  },
  set: ({ set, get }, newValue) => {
    const currentQuestion = get(myQuestionAtom);
    const updatedQuestion = [...currentQuestion, ...(newValue as MyQuestion[])];

    set(myQuestionAtom, updatedQuestion);
  },
});
