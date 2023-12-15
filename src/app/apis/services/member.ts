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
