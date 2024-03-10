import { selector } from 'recoil';
import { interviewAtom } from './atom';
import { CategoryName } from '@/types/question';

export const categoryNameSelector = selector({
  key: 'categoryNameSelector',
  get: ({ get }) => {
    const interviewQuestion = get(interviewAtom);
    return interviewQuestion.categoryName;
  },
  set: ({ set, get }, newValue) => {
    const updatedCategoryName = {
      ...get(interviewAtom),
      categoryName: newValue as CategoryName,
    };

    set(interviewAtom, updatedCategoryName);
  },
});
