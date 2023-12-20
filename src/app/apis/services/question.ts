import { instance } from '../axios';

export const getUserInfo = async ({ page = 0 }: { page: number }) => {
  try {
    const res = await instance().get(`api/question/all`, {
      params: {
        page,
      },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
