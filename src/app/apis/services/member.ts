import { FetcherResponse } from 'swr/_internal';
import { instance } from '../axios';
import { DetailData, QuestionData } from '@/components/page/My/InterviewComponent';

export const getUserInfo = async () => {
  try {
    const res = await instance().get(`api/member/info`);
    return res.data.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getInterviewDetail = async (id: number): Promise<DetailData> => {
  try {
    const res = await instance().get(`api/member/interview/detail`, {
      params: {
        interId: id,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getInterviewLikeDetail = async (id: number): Promise<DetailData> => {
  try {
    const res = await instance().get(`api/interview/detail`, {
      params: {
        interId: id,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const getInterviewQuestionDetail = async (
  selectInterviewId: number,
  selectQuestionId: number,
): Promise<QuestionData> => {
  try {
    const res = await instance().get(`api/member/interview/question/detail`, {
      params: {
        interviewId: selectInterviewId,
        questionId: selectQuestionId,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const postInterviewLike = async (interviewId: number) => {
  try {
    const res = await instance().post(`api/member/like`, {
      interviewId,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMyCategoryInterview = async (url: string) => {
  try {
    const res = await instance().get(url);
    return res.data.data.result;
  } catch (error) {}
};

export type PostCartProps = {
  categoryName: string;
  subcategoryName: string;
  questionContent: string;
};

export const postCartsave = async ({
  categoryName,
  subcategoryName,
  questionContent,
}: PostCartProps) => {
  try {
    const res = await instance().post(`api/cart/question/save`, {
      categoryName,
      subcategoryName,
      questionContent,
    });
    console.log(res);
    return res;
  } catch (error) {}
};

export const deleteInterview = async (id: number) => {
  const res = await instance().delete('/api/member/interview/delete', {
    params: {
      id,
    },
  });

  return res.data;
};

export const deleteQuestion = async (url: string, { arg }: { arg: string }) => {
  const res = await instance().delete(url, {
    params: {
      id: arg,
    },
  });

  return res.data;
};
