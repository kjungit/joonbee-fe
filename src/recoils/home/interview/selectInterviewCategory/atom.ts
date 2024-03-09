import { CategoryName } from '@/types';
import { atom } from 'recoil';

export const selectInterviewCategoryState = atom({
  key: 'selectInterviewCategoryState',
  default: {
    category: 'fe' as CategoryName,
    sort: 'latest',
  },
});
