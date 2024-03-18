import { CategoryName, SubcategoryName } from '@/types/question';
import { atom } from 'recoil';

export const InterviewCategoryAtom = atom<CategoryName>({
  key: 'InterviewCategoryAtom',
  default: 'fe',
});
