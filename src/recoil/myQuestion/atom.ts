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
  key: 'myQuestionState',
  default: [
    {
      questionId: 1,
      categoryName: '프론트엔드',
      subcategoryName: 'React',
      questionContent: 'React의 장점에 대해 설명하세요.',
      isChecked: false,
    },
  ],
});
