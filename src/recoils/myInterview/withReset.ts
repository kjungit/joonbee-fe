import { selector } from 'recoil';
import { myInterviewAtom } from './atom';

export const resetQuestionListSelector = selector({
  key: 'resetQuestionListSelector',
  get: ({ get }) => {},
  set: ({ set }) => {
    set(myInterviewAtom, prevState => ({
      ...prevState,
      questions: [],
    }));
  },
});
