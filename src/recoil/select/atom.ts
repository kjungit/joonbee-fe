import { CategoryName, SubcategoryName } from '@/types/question';
import { atom } from 'recoil';

export const selectedCategoryState = atom<CategoryName>({
  key: 'selectedCategoryState',
  default: '카테고리',
});

export const selectedSubcategoryState = atom<SubcategoryName>({
  key: 'selectedSubcategoryState',
  default: '세부 카테고리',
});
