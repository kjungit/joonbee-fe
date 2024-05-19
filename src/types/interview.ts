export interface InterviewItem {
  categoryName: string;
  interviewId: number;
  likeCount: number;
  liked: boolean;
  memberId: string;
  nickname: string;
  questions: QuestionContent[];
  thumbnail: string;
  subCategoryName: string[];
}

export type MyInterview = {
  questionId: string;
  questionContent: string;
  answerContent: string;
  isOpen: boolean;
};

export type QuestionContent = {
  questionContent: string;
  questionId: number;
};
export interface DetailData {
  gptOpinion: string;
  questionContents: QuestionData[];
}

export interface QuestionData {
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
  questionId: number;
  isOpen: boolean;
}

export interface InterviewSaveData {
  gptOpinion: string;
  categoryName: string;
  questions: ResQuestionsProps[];
}

export interface ViewInterviewData {
  gptOpinion: string;
  categoryName: string;
  questions: ViewResQuestionProps[];
}

export interface ResQuestionsProps {
  questionId: number;
  questionContent: string;
  answerContent: string;
  commentary: string;
  evaluation: string;
}

export interface ViewResQuestionProps extends ResQuestionsProps {
  isOpen: boolean;
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

export interface InterviewSaveData {
  gptOpinion: string;
  categoryName: string;
  questions: ResQuestionsProps[];
}
export interface MyClickInterview {
  questionId: number;
  questionContent: string;
  isOpen: boolean;
}

export interface MyMenuInterviewItem {
  categoryName: string;
  interviewId: number;
  questionCount: number;
}

export type InterviewType = 'choice' | 'random';
export interface ViewInterfaceProps {
  gptOpinion: string;
  questionContents: QuestionContentsProps[];
}

export interface QuestionContentsProps {
  questionId: number;
  questionContent: string;
  isOpen: boolean;
  infoList: {
    evaluation: ItemProps;
    commentary: ItemProps;
    answerContent: ItemProps;
  };
}

export interface ItemProps {
  id: 'answerContent' | 'evaluation' | 'commentary';
  value: string;
  isOpen: boolean;
}

export interface OpenAiInterviewData {
  gptOpinion: string;
  questions: OpenAiInterviewQuestion[];
}

export interface OpenAiInterviewQuestion {
  commentary: string;
  evaluation: string;
  questionId: number;
}
