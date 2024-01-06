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

export const postInterviewLike = async (interviewId: string) => {
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
    const res = await instance().post(`api/member/question/save`, {
      categoryName,
      subcategoryName,
      questionContent,
    });
    console.log(res);
    return res;
  } catch (error) {}
};
