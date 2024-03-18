import { InterviewSaveData } from '@/types/interview';
import { instance } from '../axios';
import { CategoryName } from '@/types';

export type InterviewProps = {
  selectCategory: CategoryName;
  sort: string;
};

export const getInterview = async ({ selectCategory, sort }: InterviewProps) => {
  try {
    const res = await instance().get('/api/interview/all', {
      params: {
        page: 1,
        category: selectCategory,
        sort,
      },
    });
    return res.data.data.result;
  } catch (error: any) {
    throw error.response.status;
  }
};

export const saveInterview = async (data: InterviewSaveData) => {
  const res = await instance().post('/api/member/interview/save', {
    gptOpinion: data?.gptOpinion,
    categoryName: data?.categoryName,
    questions: data?.questions,
  });
  return res;
};
