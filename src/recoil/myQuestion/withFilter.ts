import { selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '../selectedCategory/atom';

export const myQuestionFilterSelector = selector<MyQuestion[]>({
  key: 'myQuestionFilterSelector',
  get: ({ get }) => {
    const categoryName = get(selectedCategoryAtom);
    const subcategoryName = get(selectedSubcategoryAtom);
    const questions = get(myQuestionAtom);

    if (categoryName === 'All' || categoryName === '') {
      return questions;
    }

    const filteredQuestions = questions.filter(question => {
      if (subcategoryName === '') {
        return question.categoryName === categoryName;
      }
      return question.categoryName === categoryName && question.subcategoryName === subcategoryName;
    });
    return filteredQuestions;
  },
});
