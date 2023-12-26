import { CategoryName, SubcategoryName } from '@/types/question';
import { atom } from 'recoil';

export const selectedCategoryAtom = atom<CategoryName>({
  key: 'selectedCategoryAtom',
  default: '',
});

export const selectedSubcategoryAtom = atom<SubcategoryName>({
  key: 'selectedSubcategoryAtom',
  default: '세부 카테고리',
});
