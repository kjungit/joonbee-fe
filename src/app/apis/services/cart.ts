import { CategoryName, SubcategoryName } from '@/types/question';
import { instance } from '../axios';

type Params = {
  category: CategoryName;
  subcategory: SubcategoryName[];
  questionCount: number;
};

export const getRandomInterview = async ({ category, subcategory, questionCount }: Params) => {
  const res = await instance().get('/api/question/gpt', {
    params: {
      category,
      subcategory,
      questionCount,
    },
  });

  return res.data.data.result;
};
