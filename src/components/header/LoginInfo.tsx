import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Text } from '../@common/text';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { VariableIcon } from '../@common/variableIcon';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';
import { NavbarIsOpenAtom } from '@/recoils/responsive/navbar/atom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

export const LoginInfo = () => {
  const [nickState, setNickState] = useRecoilState(NickNameAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const [isOpen, setIsOpen] = useRecoilState(NavbarIsOpenAtom);
  const [cookies] = useCookies(['joonbee-token']);

  return (
    <div
      className={`h-full min-w-[260px] flex items-center justify-center border-r-[1px] border-gray-normal ${
        isOpen ? '!min-w-[260px] ' : 'md:min-w-[260px] min-w-[50px]'
      }`}>
      <div className={`hidden md:block ${isOpen && '!block'}`}>
        {cookies['joonbee-token'] ? (
          <div className="flex gap-2 items-center">
            <Image
              src={userInfo.thumbnail}
              alt={`${userInfo.nickName} profile`}
              width={24}
              height={24}
              className="rounded-full"
            />
            <Text size="lg">{userInfo.nickName}</Text>
            <button
              onClick={() => {
                setNickState({
                  ...nickState,
                  id: userInfo.id,
                });
                setIsOpen(false);
                setIsNickOpen(!isNickOpen);
              }}>
              <VariableIcon name="edit" size={16} isHover />
            </button>
          </div>
        ) : (
          <Text size="lg">로그인을 해주세요.</Text>
        )}
      </div>
    </div>
  );
};
