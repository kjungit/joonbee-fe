'use client';

import IconButtonLink from '@/components/@common/iconButtonLink';
import ModalPortal from '@/components/@common/modalPortal';
import { VariableIcon } from '@/components/@common/variableIcon';
import { useLogout } from '@/queries/user/useLogout';
import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const MyHeader = () => {
  const [isLogined, setIsLogined] = useRecoilState(isLoginedAtom);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const { logoutMutate, isLogoutSuccess } = useLogout();
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get('category');

  useEffect(() => {
    setIsLogoutLoading(false);
  }, [isLogoutSuccess]);

  return (
    <nav className="flex justify-between w-full">
      <div className="flex justify-between items-center gap-2">
        <IconButtonLink
          color={categoryParams === 'interview' ? 'blue' : 'white'}
          className={`${categoryParams === 'interview' && 'font-bold'}`}
          path="/my?category=interview&Ifield=fe"
          iconName="checklist.png"
          edge="start"
          size="sm">
          면접 보기
        </IconButtonLink>
        <IconButtonLink
          color={categoryParams === 'question' ? 'blue' : 'white'}
          className={`${categoryParams === 'question' && 'font-bold'}`}
          path="/my?category=question&Qfield=fe&subField=react"
          iconName="checklist.png"
          edge="start"
          size="sm">
          질문 보기
        </IconButtonLink>
      </div>
      <div className="h-full flex justify-center items-center cursor-pointer mr-4 hover:text-gray-disabled">
        <VariableIcon
          name="logout"
          size={20}
          isHover
          onClick={() => {
            setIsLogoutLoading(true);
            logoutMutate();
            setIsLogined(false);
          }}
        />
      </div>
      {/* // 로그아웃 로딩 표시 */}
      {isLogoutLoading && (
        <ModalPortal>
          <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
            <Image src={'/loginLoading.gif'} width={70} height={70} alt="loading" />
          </div>
        </ModalPortal>
      )}
    </nav>
  );
};
