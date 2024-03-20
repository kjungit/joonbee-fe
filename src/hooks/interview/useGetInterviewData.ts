import { MyInterviewQuestions } from '@/apis/services/openAiApis';
import useGetRandomQuestionList from '@/queries/question/useGetRandomQuestion';
import {
  interviewQuestionCountAtom,
  interviewRandomCategoryAtom,
  interviewRandomSubcategoryAtom,
  interviewTypeAtom,
} from '@/recoils/interview/atom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function useGetInterviewData() {
  const [questionData, setQuestionData] = useState<MyInterviewQuestions[]>([]);
  const interviewType = useRecoilValue(interviewTypeAtom);
  const category = useRecoilValue(interviewRandomCategoryAtom);
  const subcategory = useRecoilValue(interviewRandomSubcategoryAtom);

  const questionCount = useRecoilValue(interviewQuestionCountAtom);

  const { randomQuestionData, isSuccess } = useGetRandomQuestionList({
    category,
    subcategory,
    questionCount,
    interviewType,
  });

  /* choice
    const questions = useRecoilValue(myQuestionAtom);

    const transformedQuestion = questions.map(question => ({
      questionId: question.questionId,
      questionContent: question.questionContent,
      answerContent: '',
    }));
    */
  /* random 
  const category = useRecoilValue(selectedRandomCategoryAtom);
  // const subcategory = useRecoilValue(selectedRandomSubcategoryAtom);
  const subcategory = '';
  const questionCount = useRecoilValue(questionCountAtom);

  console.log(category, subcategory, questionCount);

  const { data: questions, isLoading } = useSWR(
    ['/api/question/gpt', category, subcategory, questionCount],
    () => getRandomQuestions(category, subcategory, questionCount),
  );

  if (isLoading) return;
*/

  useEffect(() => {
    if (isSuccess && randomQuestionData?.length) {
      const updatedQuestionData = randomQuestionData.map((question: any) => ({
        ...question,
        answerContent: '',
      }));
      if (interviewType === 'random') setQuestionData(updatedQuestionData);
    }
  }, [isSuccess]);

  return { questionData };
}
