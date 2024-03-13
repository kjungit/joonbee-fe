import { useSearchParams } from 'next/navigation';
import { MyInterviewMenu } from './myInterviewMenu';
import { MyQuestionMenu } from './myQuestionMenu';

export const MyMenu = () => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  return (
    <>
      {categoryParams === 'interview' && <MyInterviewMenu />}
      {categoryParams === 'question' && <MyQuestionMenu />}
    </>
  );
};
