import { atom } from 'recoil';
import { CategoryName, SubcategoryName } from '@/types/question';

export type MyQuestion = {
  questionId: number;
  categoryName: CategoryName;
  subcategoryName: SubcategoryName;
  questionContent: string;
  isChecked: boolean;
};

export const myQuestionAtom = atom<MyQuestion[]>({
  key: 'myQuestionAtom',
  default: [],
});
