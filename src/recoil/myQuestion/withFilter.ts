import { selector } from 'recoil';
import { MyQuestion, myQuestionAtom } from './atom';
import { selectedCategoryAtom, selectedSubcategoryAtom } from '../selectedCategory/atom';

export const myQuestionFilterSelector = selector<MyQuestion[]>({
  key: 'myQuestionFilterSelector',
  get: ({ get }) => {
    const categoryName = get(selectedCategoryAtom);
    const subcategoryName = get(selectedSubcategoryAtom);
    const allQuestions = get(myQuestionAtom);

    console.log('cat', categoryName);
    console.log('sub', subcategoryName);

    if (categoryName === 'All' || categoryName === '') {
      return allQuestions;
    }

    const filteredQuestions = allQuestions.filter(question => {
      if (subcategoryName === '') {
        return question.categoryName === categoryName;
      }
      return question.categoryName === categoryName && question.subcategoryName === subcategoryName;
    });
    return filteredQuestions;
  },
});
