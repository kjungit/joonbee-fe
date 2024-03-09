'use cleint';
import React from 'react';
import ModalPortal from '../ui/ModalPortal';
import { Button } from '../ui/Button';

type Props = {
  onClose: () => void;
  title: string;
  subTitle: string;
};

export default function ModalAlert({ onClose, title, subTitle }: Props) {
  const onModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <ModalPortal>
      <div
        onClick={onModalClick}
        className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
        <div className="w-[390px] h-[380px] border-4 border-bg-main-primary flex items-center justify-center rounded-[50px] bg-white shadow-md">
          <div className="flex flex-col gap-[26px] items-center justify-center p-[30px]">
            {/* <Logo size={'md'} /> */}
            <div className="flex flex-col items-center">
              <h3 className="text-[#4149A6] text-2xl font-bold">{title} </h3>
              <p className="text-status-alert font-bold">{subTitle}</p>
            </div>
            <div className="flex flex-col gap-2 relative">
              <Button size="2lg" onClick={onButtonClick}>
                확인
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
