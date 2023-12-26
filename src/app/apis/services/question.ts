import { instance } from '../axios';

type QuestionType = {
  page: number;
  category: string;
  subcategory: string;
};

export const getQuestionList = async ({
  page = 0,
  category = '',
  subcategory = '',
}: QuestionType) => {
  try {
    const res = await instance().get(`api/question/all`, {
      params: {
        page,
        category,
        subcategory,
      },
    });
    return res.data.data.result;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
