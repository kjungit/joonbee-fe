'use client';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import Button from '../button';
import { VariableIcon } from '../variableIcon';

export const CommonModal = ({
  isModalOpen = false,
  setIsModalOpen,
  children,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return (
    <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
      <div className="relative w-[280px] h-[260px] flex items-center justify-center rounded-xl bg-white shadow-md">
        <div className="flex flex-col gap-16 items-center justify-center p-[30px]">
          <div className="flex flex-col gap-5 w-full">
            {isModalOpen && (
              <button
                className="absolute right-4 top-4"
                onClick={() => setIsModalOpen(!isModalOpen)}>
                <VariableIcon name="close" size={24} isHover className="p-1" />
              </button>
            )}
          </div>
          {children}
          <div>
            <Button size="xl" onClick={() => setIsModalOpen(!isModalOpen)}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
