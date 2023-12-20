import { instance } from '../axios';

export const getInterview = async ({
  page = 0,
  category = '',
}: {
  page: number;
  category: string;
}) => {
  const res = await instance().get('/api/interview/all', {
    params: {
      page,
      category,
    },
  });
  return res.data.data.result;
};
