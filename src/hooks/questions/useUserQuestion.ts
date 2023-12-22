import { UserQuestionsResponseData, getUserQuestions } from '@/app/apis/services/cart';
import { myQuestionAtom } from '@/recoil/myQuestion/atom';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

export default function useUserQuestion(params) {
  const [myQuestions, setMyQuestion] = useRecoilState(myQuestionAtom);

  const { data, isLoading } = useSWR<UserQuestionsResponseData[]>(
    ['/api/cart/questions', params],
    () => getUserQuestions(params),
    {
      onSuccess: data => {
        const questions = data.map(item => ({ ...item, isClicked: true }));
        setMyQuestion(questions);
      },
    },
  );

  return { myQuestions, isLoading };
}
