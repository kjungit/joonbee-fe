import { atom } from 'recoil';
import { CategoryName, SubcategoryName } from '@/types/question';

export type MyQuestion = {
  questionId: string;
  category: CategoryName;
  subcategory: SubcategoryName;
  questionContent: string;
};

export const myQuestionAtom = atom<MyQuestion[]>({
  key: 'myQuestionAtom',
  default: [],
});
