'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../button';
import { Text } from '../text';
import { useRecoilState } from 'recoil';
import { NickNameAtom } from '@/recoils/user/isNickName/atom';
import { VariableIcon } from '../variableIcon';
import { useUpdateNick } from '@/queries/user/useUpdateNick';
import { isNickAtom } from '@/recoils/user/isNickOpen/atom';

export const NickNameModal = ({ isClose = false }: { isClose?: boolean }) => {
  const [inputState, setInputState] = useState('');
  const [nickState, setNickState] = useRecoilState(NickNameAtom);
  const [isNickOpen, setIsNickOpen] = useRecoilState(isNickAtom);

  const { nickMutate, nickError } = useUpdateNick();

  const handleChangeNick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setInputState(e.target.value);
    }
  };

  useEffect(() => {
    setNickState({
      ...nickState,
      nickName: inputState,
    });
  }, [inputState]);

  return (
    <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
      <div className="relative w-[280px] h-[260px] flex items-center justify-center rounded-xl bg-white shadow-md">
        <div className="flex flex-col gap-16 items-center justify-center p-[30px]">
          <div className="flex flex-col gap-5 w-full">
            {isClose && (
              <button className="absolute right-4 top-4" onClick={() => setIsNickOpen(!isNickOpen)}>
                <VariableIcon name="close" size={24} isHover className="p-1" />
              </button>
            )}
            <div className="flex flex-col items-center w-full">
              <Text size="2xl" className="text-blue-secondary w-full" weight="lg">
                닉네임을 작성해주세요.
              </Text>
              <Text className="w-full">10자를 이하로 작성해주세요.</Text>
            </div>
            <div>
              <input
                type="text"
                value={nickState.nickName}
                onChange={handleChangeNick}
                autoFocus
                className="w-full rounded-lg px-4 py-2 border border-gray-normal h-12"
              />
              <Text size="md" color="red" className="pl-2 h-2">
                {nickError === 400 && <>중복된 닉네임입니다.</>}
              </Text>
            </div>
          </div>
          <div>
            <Button
              size="xl"
              onClick={() => {
                nickMutate({ id: nickState.id, nickName: nickState.nickName });
              }}
              disabled={inputState === '' ? true : false}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
