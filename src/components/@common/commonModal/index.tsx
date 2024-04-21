'use client';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Button from '../button';
import { VariableIcon } from '../variableIcon';

export const CommonModal = ({
  isModalOpen = false,
  setIsModalOpen,
  children,
  onFunc,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onFunc?: () => void;
}) => {
  return (
    <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
      <div className="relative w-[280px] md:h-[260px] h-[200px] flex items-center justify-center rounded-xl bg-white shadow-md">
        <div className="flex flex-col md:gap-16 gap-10 items-center justify-center p-[30px]">
          <div className="flex flex-col gap-5 w-full">
            {isModalOpen && (
              <button
                className="absolute right-4 top-4"
                onClick={() => {
                  onFunc && onFunc();
                  setIsModalOpen(!isModalOpen);
                }}>
                <VariableIcon name="close" size={24} isHover className="p-1" />
              </button>
            )}
          </div>
          {children}
          <div>
            <Button
              size="xl"
              onClick={() => {
                onFunc && onFunc();
                setIsModalOpen(!isModalOpen);
              }}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
