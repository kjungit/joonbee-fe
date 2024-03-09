import { CategoryName, SubcategoryName } from '@/types';
import { atom } from 'recoil';

export const selectQuestionCategoryState = atom({
  key: 'selectQuestionCategoryState',
  default: {
    category: 'fe' as CategoryName,
    subCategory: 'react' as SubcategoryName,
  },
});
