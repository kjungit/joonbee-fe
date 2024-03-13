import { CategoryName, SubcategoryName } from '@/types';
import { atom } from 'recoil';

export const mySelectQuestionCategoryState = atom({
  key: 'mySelectQuestionCategoryState',
  default: {
    category: 'fe' as CategoryName,
    subCategory: 'react' as SubcategoryName,
  },
});
