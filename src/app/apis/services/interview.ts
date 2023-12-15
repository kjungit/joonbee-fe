import { instance } from '../axios';

export const getInterview = async ({ page = 0 }: { page: number }) => {
  const res = await instance().get('/api/interview/all', {
    params: {
      page,
    },
  });
  return res.data.data.result;
};
