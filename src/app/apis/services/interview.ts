import { instance } from '../axios';

export const getInterview = async (url: string) => {
  const res = await instance(false).get(url);
  return res.data.data.result;
};
