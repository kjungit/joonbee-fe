export interface InterviewItem {
  categoryName: string;
  interviewId: number;
  likeCount: number;
  liked: boolean;
  memberId: string;
  nickname: string;
  questions: QuestionContent[];
  thumbnail: string;
}

export type MyInterview = {
  questionId: string;
  questionContent: string;
  answerContent: string;
};

type QuestionContent = {
  questionContent: string;
  questionId: number;
};
export interface DetailData {
  gptOpinion: string;
  questionContents: QuestionContent[];
}

export interface QuestionData {
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
  questionId: string;
  interviewId: string;
}

export interface InteviewSaveData {
  gptOpinion: string;
  categoryName: string;
  questions: ResQuestionsProps[] | undefined;
}

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
