import { Button } from '../../ui/Button';
import Logo from '../../ui/Logo';
import React from 'react';

type Props = {
  isDuplicate: boolean;
  onChangeNinkName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickNickName: () => void;
};

export default function NickEditModal({ isDuplicate, onChangeNinkName, onClickNickName }: Props) {
  return (
    <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
      <div className="w-[390px]  h-[380px] rounded-[50px] bg-white shadow-md">
        <div className="flex flex-col gap-[26px] items-center justify-center p-[30px]">
          <Logo size="md" />
          <h3 className="text-[#4149A6] text-2xl font-bold">닉네임을 작성해주세요.</h3>
          <div className="flex flex-col gap-2 relative">
            <p className="absolute top-[-22px] text-[red] text-sm h-4">
              {isDuplicate && '중복된 닉네임입니다.'}
            </p>
            <form action="" className="flex gap-[12px] flex-col">
              <div className="outline-none  w-[292px] h-[54px] shadow-md rounded-xl">
                <input
                  onChange={onChangeNinkName}
                  className={`w-[292px] h-[54px] border-2 border-white px-6 rounded-xl text-xl font-bold
                ${isDuplicate && 'border-2 border-[red]'}`}
                  type="text"
                />
              </div>
              <Button size="2lg" onClick={onClickNickName}>
                등록
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
