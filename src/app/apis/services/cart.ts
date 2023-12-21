import { AllCategory, CategoryName, QuestionCategory, SubcategoryName } from '@/types/question';
import { instance } from '../axios';

export type RandomQuestionsParams = QuestionCategory & {
  questionCount: number;
};

type UserQuestionsParams = AllCategory & {
  page?: number;
};

type QuestionData = AllCategory & {
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
export const getUserQuestions = async ({
  category,
  subcategory,
  page = 1,
}: UserQuestionsParams) => {
  category = category === 'All' ? '' : category;

  const res = await instance().get('/api/cart/questions', {
    params: {
      category,
      subcategory,
      page,
    },
  });

  console.log('res', res.data.data.result);

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
  console.log('api 호출');
  const res = await instance().post('/api/cart/question/save', {
    categoryName: category,
    subcategoryName: subcategory,
    questionContent,
  });

  return res.data.data.result;
};
