import { MyInterviewQuestions } from '@/apis/services/openAiApis';
import useGetRandomQuestionList from '@/queries/question/useGetRandomQuestion';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import { interviewQuestionCountAtom, interviewTypeAtom } from '@/recoils/interview/atom';
import { myInterviewAtom } from '@/recoils/myInterview/atom';
import { addQuestionListSelector, addQuestionSelector } from '@/recoils/myInterview/withAdd';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function useGetInterviewData() {
  const [questionData, setQuestionData] = useState<MyInterviewQuestions[]>([]);
  const interviewType = useRecoilValue(interviewTypeAtom);
  const mySelectCategory = useRecoilValue(mySelectQuestionCategoryState);
  const chocieQuestionData = useRecoilValue(addQuestionSelector);

  const [questionCount, setQuestionCount] = useRecoilState(interviewQuestionCountAtom);

  const { randomQuestionData, isSuccess } = useGetRandomQuestionList({
    category: mySelectCategory.category,
    subcategory: mySelectCategory.subCategory,
    questionCount,
    interviewType,
  });

  useEffect(() => {
    if (interviewType === 'random') {
      if (isSuccess && randomQuestionData?.length) {
        const updatedQuestionData = randomQuestionData.map((question: any) => ({
          ...question,
          answerContent: '',
        }));

        setQuestionData(updatedQuestionData);
      }
    }
    if (interviewType === 'choice') {
      const updatedQuestionData = chocieQuestionData.map((question: any) => ({
        ...question,
        answerContent: '',
      }));

      setQuestionData(updatedQuestionData);
    }
  }, [isSuccess]);

  return { questionData };
}
