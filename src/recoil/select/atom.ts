import { atom } from 'recoil';

type categoryType = 'frontEnd' | 'backEnd' | 'language';

type Category = {
  [key in categoryType]: { subcategories: string[] };
};

const category: Category = {
  frontEnd: {
    subcategories: ['React', 'Vue', 'Angular'],
  },
  backEnd: {
    subcategories: ['Express', 'Next'],
  },
  language: {
    subcategories: ['Javascript', 'Typescript'],
  },
};

export const categoryState = atom({
  key: 'category',
  default: category,
});

export const selectedValueState = atom({
  key: 'selectedValue',
  default: { selectedCategory: '카테고리', selectedSubcategory: '' },
});
