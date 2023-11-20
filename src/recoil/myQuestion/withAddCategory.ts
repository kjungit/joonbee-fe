import { CategoryName } from '@/types/question';
import { selector } from 'recoil';
import { myQuestionAtom } from './atom';

export const myCategoryAddSelector = selector<CategoryName[]>({
  key: 'myCategoryAddSelector',
  get: ({ get }) => {
    const questions = get(myQuestionAtom);
    const filteredQuestions = questions.filter(question => question.isChecked === true);
    const categorySet = new Set<CategoryName>();

    filteredQuestions.forEach(question => {
      categorySet.add(question.categoryName);
    });

    return Array.from(categorySet);
  },
});
