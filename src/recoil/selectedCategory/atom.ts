import { CategoryName, SubcategoryName } from '@/types/question';
import { atom } from 'recoil';

export const selectedCategoryAtom = atom<CategoryName>({
  key: 'selectedCategoryAtom',
  default: '',
});

export const selectedSubcategoryAtom = atom<SubcategoryName>({
  key: 'selectedSubcategoryAtom',
  default: '',
});
