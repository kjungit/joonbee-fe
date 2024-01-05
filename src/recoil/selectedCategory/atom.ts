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

export const selectedChocieCategoryAtom = atom<CategoryName>({
  key: 'selectedChocieCategoryAtom',
  default: '',
});

export const selectedRandomCategoryAtom = atom<CategoryName>({
  key: 'selectedRandomCategoryAtom',
  default: '',
});

export const selectedRandomSubcategoryAtom = atom<SubcategoryName>({
  key: 'selectedRandomSubcategoryAtom',
  default: '세부 카테고리',
});

export const selectedSubmitCategoryAtom = atom<CategoryName>({
  key: 'selectedSubmitCategoryAtom',
  default: '',
});

export const selectedSubmitSubcategoryAtom = atom<SubcategoryName>({
  key: 'selectedSubmitSubcategoryAtom',
  default: '세부 카테고리',
});
