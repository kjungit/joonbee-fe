import { selector } from 'recoil';
import { interviewQuestionAtom } from './atom';

type UpdatedAnswer = {
  questionId: number;
  newAnswerContent: string;
};

export const interviewAnswerSelector = selector({
  key: 'interviewAnswerSelector',
  get: ({ get }) => {
    return get(interviewQuestionAtom);
  },
  //@ts-ignore
  set: ({ get, set }, newValue: UpdatedAnswer) => {
    const questionId = newValue.questionId;
    const newAnswerContent = newValue.newAnswerContent;
    const interviewQuestion = get(interviewQuestionAtom);
    const updatedQuestions = interviewQuestion.questions.map(question => {
      if (question.questionId === questionId) {
        return {
          ...question,
          answerContent: newAnswerContent,
        };
      }
      return question;
    });

    const updatedQuestionState = {
      ...interviewQuestion,
      questions: updatedQuestions,
    };

    set(interviewQuestionAtom, updatedQuestionState);
  },
});
