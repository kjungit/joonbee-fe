import { selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '../selectedCategory/atom';

export const myQuestionFilterSelector = selector<MyQuestion[]>({
  key: 'myQuestionFilterSelector',
  get: ({ get }) => {
    const categoryName = get(selectedCategoryAtom);
    const subcategoryName = get(selectedSubcategoryAtom);
    const allQuestions = get(myQuestionAtom);

    if (categoryName === 'All') {
      return allQuestions;
    } else {
      const filteredQuestions = allQuestions.filter(
        question =>
          question.categoryName === categoryName && question.subcategoryName === subcategoryName,
      );
      return filteredQuestions;
    }
  },
});
