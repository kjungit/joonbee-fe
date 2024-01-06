import { instance } from '../axios';

export const getInterview = async (url: string) => {
  const res = await instance(false).get(url);
  return res.data.data.result;
};

export const deleteInterview = async (id: number) => {
  const res = await instance().delete('/api/member/interview/delete', {
    params: {
      id,
    },
  });

  return res.data;
};
