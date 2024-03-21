import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { selectMenuState } from '@/recoils/home/selectMenu/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { MouseEvent } from 'react';
import { useRecoilState } from 'recoil';

export const HomeHeader = () => {
  const [selectMenu, setSelectMenu] = useRecoilState(selectMenuState);
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  const handleClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setSelectMenu(target.id);
    if (target.id === 'interview') {
      router.push(`/?category=${target.id}&Ifield=fe`);
    } else if (target.id === 'question') {
      // question navbar 설정 후 상태값 적용해야함
      router.push(`/?category=${target.id}&Qfield=fe&subField=react`);
    }

    if (categoryParams !== target.id)
      setSelectInterviewCategory({ category: 'fe', sort: 'latest' });
  };

  return (
    <>
      <button
        onClick={handleClickMenu}
        id="interview"
        className={`${categoryParams === 'interview' && 'font-bold'}`}>
        면접 보기
      </button>
      <button
        onClick={handleClickMenu}
        id="question"
        className={`${categoryParams === 'question' && 'font-bold'}`}>
        질문 보기
      </button>
    </>
  );
};
