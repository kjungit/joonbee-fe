import { instance } from '../axios';

export const getToken = async () => {
  const res = await instance().get('/token');
  return res;
};
