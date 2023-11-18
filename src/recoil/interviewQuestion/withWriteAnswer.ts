import { selector } from 'recoil';
import { interviewQuestionState } from './atom';

type UpdatedAnswer = {
  questionId: number;
  newAnswerContent: string;
};

export const interviewAnswerSelector = selector({
  key: 'interviewAnswerSelector',
  get: ({ get }) => {
    return get(interviewQuestionState);
  },
  //@ts-ignore
  set: ({ get, set }, newValue: UpdatedAnswer) => {
    const questionId = newValue.questionId;
    const newAnswerContent = newValue.newAnswerContent;
    console.log(questionId, newAnswerContent);
    const interviewQuestion = get(interviewQuestionState);
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

    set(interviewQuestionState, updatedQuestionState);
  },
});
