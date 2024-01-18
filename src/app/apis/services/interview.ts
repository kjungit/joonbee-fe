import {
  InteviewSaveData,
  ResQuestionsProps,
} from '@/components/page/interview/result/InterviewResultContainer';
import { instance } from '../axios';

export const getInterview = async (url: string) => {
  const res = await instance(false).get(url);
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
