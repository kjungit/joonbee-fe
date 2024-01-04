import { atom } from 'recoil';

export const chceckedQuestionAtom = atom({
  key: 'chceckedQuestionAtom',
  default: {
    questionId: [],
  },
});
