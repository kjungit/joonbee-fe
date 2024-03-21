import { isLoginedAtom } from '@/recoils/user/isLogined/atom';
import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Text } from '../@common/text';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { userInfoAtom } from '@/recoils/user/userInfo/atom';
import { VariableIcon } from '../@common/variableIcon';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';

export const LoginInfo = () => {
  const isLogined = useRecoilValue(isLoginedAtom);
  const [nickState, setNickState] = useRecoilState(NickNameAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);
  const userInfo = useRecoilValue(userInfoAtom);

  return (
    <div className="h-full min-w-[260px] flex items-center justify-center border-r-[1px] border-gray-normal">
      {isLogined ? (
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
              setIsNickOpen(!isNickOpen);
            }}>
            <VariableIcon name="edit" size={16} isHover />
          </button>
        </div>
      ) : (
        <Text size="lg">로그인을 해주세요.</Text>
      )}
    </div>
  );
};
