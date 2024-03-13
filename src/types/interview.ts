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
  isOpen: boolean;
};

type QuestionContent = {
  questionContent: string;
  questionId: number;
};
export interface DetailData {
  gptOpinion: string;
  questionContents: QuestionData[];
}

export interface QuestionData {
  questionContent: string;
  commentary: string;
  evaluation: string;
  questionId: number;
  isOpen: boolean;
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
export interface MyClickInterview {
  questionId: number;
  questionContent: {
    id: string;
    value: string;
    isOpen: boolean;
  };
  evaluation: {
    id: string;
    value: string;
    isOpen: boolean;
  };
  commentary: {
    id: string;
    value: string;
    isOpen: boolean;
  };
  isOpen: boolean;
}

export interface MyMenuInterviewItem {
  categoryName: string;
  interviewId: number;
  questionCount: number;
}
