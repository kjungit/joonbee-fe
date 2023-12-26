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

export const getCategoryInterview = async (page: number) => {
  try {
    const res = await instance().get(`api/member/category`, {
      params: {
        page,
      },
    });
    console.log(res);
    return res.data.data.result;
  } catch (error) {}
};

export const getLikeCategoryInterview = async (page: number) => {
  try {
    const res = await instance().get(`api/member/category/like`, {
      params: {
        page,
      },
    });
    return res.data.data.result;
  } catch (error) {}
};
