import IconButton from '@/components/@common/iconButton';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useLogout } from '@/queries/user/useLogout';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export const MyHeader = () => {
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
      <div className="flex justify-between items-center gap-2">
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
      <div className="h-full flex justify-center items-center cursor-pointer mr-4 hover:text-gray-disabled">
        <VariableIcon
          name="logout"
          size={20}
          isHover
          onClick={() => {
            logoutMutate();
            setIsLogined(false);
          }}
        />
      </div>
    </nav>
  );
};
