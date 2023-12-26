import { CategoryName, QuestionCategory, SubcategoryName } from '@/types/question';
import { instance } from '../axios';

export type RandomQuestionsParams = QuestionCategory & {
  questionCount: number;
};

export type UserQuestionsParams = {
  category: CategoryName;
  subcategory: SubcategoryName;
  page?: number;
};

export type QuestionData = {
  category: CategoryName;
  subcategory: SubcategoryName;
  questionContent: string;
};

export type UserQuestionsResponseData = QuestionData & {
  questionId: string;
};

/**
 * 랜덤 질문들 가져오기 api
 */
export const getRandomQuestions = async ({
  category,
  subcategory,
  questionCount,
}: RandomQuestionsParams) => {
  const subcategories = [...subcategory];
  const res = await instance().get('/api/question/gpt', {
    params: {
      category,
      subcategory: subcategories,
      questionCount,
    },
  });

  return res.data.data.result;
};

/**
 * 사용자가 추가한 질문들 가져오기 api
 */
export const getUserQuestions = async (url: string) => {
  const res = await instance().get(url);
  return res.data.data.result;
};

/**
 * 사용자 질문 등록 api
 */
export const postUserQuestion = async ({
  category,
  subcategory,
  questionContent,
}: QuestionData) => {
  const res = await instance().post('/api/cart/question/save', {
    categoryName: category,
    subcategoryName: subcategory,
    questionContent,
  });

  return res.data.data.result;
};
