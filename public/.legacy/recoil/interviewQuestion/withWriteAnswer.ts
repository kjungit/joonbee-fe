import { selector } from 'recoil';
import { interviewAtom } from './atom';

type UpdatedAnswer = {
  questionId: number;
  newAnswerContent: string;
};

export const interviewAnswerSelector = selector({
  key: 'interviewAnswerSelector',
  get: ({ get }) => {
    return get(interviewAtom);
  },
  //@ts-ignore
  set: ({ get, set }, newValue: UpdatedAnswer) => {
    const questionId = newValue.questionId;
    const newAnswerContent = newValue.newAnswerContent;
    const interview = get(interviewAtom);
    const updatedQuestions = interview.questions.map(question => {
      if (question.questionId === questionId) {
        return {
          ...question,
          answerContent: newAnswerContent,
        };
      }
      return question;
    });

    const updatedQuestionState = {
      ...interview,
      questions: updatedQuestions,
    };

    set(interviewAtom, updatedQuestionState);
  },
});
