import {
  InteviewSaveData,
  ResQuestionsProps,
} from '@/components/page/interview/result/InterviewResultContainer';
import { instance } from '../axios';
import { CategoryName } from '@/types/question';

export type InterviewProps = {
  categorySelect: CategoryName;
  current: string;
};

export const getInterview = async ({ categorySelect, current }: InterviewProps) => {
  const res = await instance(false).get('/api/interview/all', {
    params: {
      page: 0,
      cetegory: categorySelect,
      sort: current,
    },
  });
  return res.data.data.result;
};

export const saveInterview = async (data: InteviewSaveData | undefined) => {
  const res = await instance().post('/api/member/interview/save', {
    gptOpinion: data?.gptOpinion,
    categoryName: data?.categoryName,
    questions: data?.questions,
  });
  return res;
};
