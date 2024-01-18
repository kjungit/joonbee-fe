import { instance } from '../axios';

export const getUserInfo = async () => {
  try {
    const res = await instance().get(`api/member/info`);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const getInterviewDetail = async (id: number) => {
  try {
    const res = await instance().get(`api/member/interview/detail`);
  } catch (error) {}
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
    console.log(res);
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
