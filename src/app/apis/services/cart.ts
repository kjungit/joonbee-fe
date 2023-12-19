import { CategoryName, SubcategoryName } from '@/types/question';
import { instance } from '../axios';

type RandomQuestionsParams = {
  category: CategoryName;
  subcategory: SubcategoryName[];
  questionCount: number;
};

type UserQuestionsCategoryParams = {
  category: CategoryName;
  page: number;
};

type UserQuestionsSubcategoryParams = {
  subcategory: SubcategoryName;
  page: number;
};

export const getRandomQuestions = async ({
  category,
  subcategory,
  questionCount,
}: RandomQuestionsParams) => {
  const res = await instance().get('/api/question/gpt', {
    params: {
      category,
      subcategory,
      questionCount,
    },
  });

  return res.data.data.result;
};

export const getUserQuestionsCategory = async ({
  category,
  page = 1,
}: UserQuestionsCategoryParams) => {
  const res = await instance().get('/api/cart/questions', {
    params: {
      category,
      page,
    },
  });

  return res.data.data.result;
};

export const getUserQuestionsSubcategory = async ({
  subcategory,
  page = 1,
}: UserQuestionsSubcategoryParams) => {
  const res = await instance().get('/api/cart/questions', {
    params: {
      subcategory,
      page,
    },
  });

  return res.data.data.result;
};
