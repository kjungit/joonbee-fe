import { instance } from '../axios';
import { CategoryName } from '@/types/question';

export type InterviewProps = {
  categorySelect: CategoryName;
  current: string;
};

export interface ResQuestionsProps {
  questionId: string;
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
}

export interface QuestionProps {
  questionId: string;
  commentary: string;
  evaluation: string;
}

export interface OpenAiResponseData {
  gptOpinion: string;
  categoryName: string;
  questions: QuestionProps[];
}

export interface InteviewSaveData {
  gptOpinion: string;
  categoryName: string;
  questions: ResQuestionsProps[] | undefined;
}
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
