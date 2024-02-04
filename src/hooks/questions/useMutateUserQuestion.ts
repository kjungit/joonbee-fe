import { postSaveQuestion, postUserQuestion } from '@/app/apis/services/question';
import { isSameStatus } from '@/recoil/isSame/atoms';
import { isTokenStatus } from '@/recoil/isToken/atoms';
import { SubcategoryName } from '@/types/question';
import { useRecoilState } from 'recoil';
import useSWRMutation from 'swr/mutation';

export default function useMutateUserQuestion(
  subcategoryName: SubcategoryName,
  questionContent: string,
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [isToken, setIsToken] = useRecoilState(isTokenStatus);
  const [isSame, setIsSame] = useRecoilState(isSameStatus);

  const { trigger, data } = useSWRMutation(
    '/api/cart/question/save',
    () => postSaveQuestion(subcategoryName, questionContent),
    {
      onSuccess: () => {
        if (setIsOpen) setIsOpen(true);
        setIsSame(false);
      },
      onError: error => {
        console.log(error.response.status === 400);
        if (error.response.status === 400) setIsSame(true);
        else setIsToken(true);
      },
    },
  );

  return { trigger, data };
}
