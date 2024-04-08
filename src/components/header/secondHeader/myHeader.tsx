import Button from '@/components/@common/button';
import IconButton from '@/components/@common/iconButton';
import { useLogout } from '@/queries/user/useLogout';
import { selectInterviewCategoryState } from '@/recoils/home/interview/selectInterviewCategory/atom';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const MyHeader = () => {
  const [selectInterviewCategory, setSelectInterviewCategory] = useRecoilState(
    selectInterviewCategoryState,
  );
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);

  const { logoutMutate } = useLogout();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');
  const handleClickMenu = (id: string) => {
    if (id === 'interview') {
      router.push(`/my?category=interview&Ifield=fe`);
    }
    if (id === 'question') {
      // 백엔드에서 유저정보 넣어주게되면 동적으로 가지고있는 데이터로 첫 메뉴 열려져있는 상태 적용하기
      router.push(`/my?category=question&Qfield=fe&subField=react`);
    }
  };

  return (
    <nav className="flex justify-between w-full">
      <div className="flex gap-2">
        <IconButton
          edge="start"
          iconName="group"
          color={categoryParams === 'interview' ? 'blue' : 'white'}
          className={categoryParams === 'interview' ? 'font-bold' : ''}
          size="sm"
          onClick={() => handleClickMenu('interview')}>
          면접 관리
        </IconButton>
        <IconButton
          edge="start"
          iconName="questionBox"
          color={categoryParams === 'question' ? 'blue' : 'white'}
          className={categoryParams === 'question' ? 'font-bold' : ''}
          size="sm"
          onClick={() => handleClickMenu('question')}>
          질문 관리
        </IconButton>
      </div>
      <button
        className="text-sm text-status-alert mr-2 p-2 whitespace-nowrap"
        onClick={() => {
          logoutMutate();
          setIsLogined(false);
        }}>
        로그아웃
      </button>
    </nav>
  );
};
