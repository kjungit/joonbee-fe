import { instance } from '../axios';

export const getInterview = async ({
  page = 0,
  category = '',
  sort = 'latest',
}: {
  page: number;
  category: string;
  sort: 'latest' | 'like';
}) => {
  const res = await instance().get('/api/interview/all', {
    params: {
      page,
      category,
      sort,
    },
  });
  return res.data.data.result;
};
