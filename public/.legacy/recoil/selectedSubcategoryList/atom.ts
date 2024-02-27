import { SubcategoryName } from '@/types/question';
import { atom } from 'recoil';

export const selectedSubcategoryListAtom = atom<SubcategoryName[]>({
  key: 'selectedSubcategoryListAtom',
  default: [],
});
