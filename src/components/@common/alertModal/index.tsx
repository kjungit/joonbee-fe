import React from 'react';
import ModalPortal from '../modalPortal';
import { CommonModal } from '../commonModal';
import { Text } from '../text';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { VariableIcon } from '../variableIcon';
import Button from '../button';

interface AlertModalProps {
  text: string;
  isOpened: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function AlertModal({ text, isOpened, onClose, onConfirm }: AlertModalProps) {
  const { modalRef } = useModalOutsideClick<HTMLDivElement>(onClose);

  return (
    <>
      {isOpened && (
        <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
          <div className="relative w-[280px]  rounded-xl bg-white shadow-md" ref={modalRef}>
            <div className="w-full p-6 mx-auto">
              <div className="flex items-start">
                <Text size="xl" className="text-blue-secondary w-full" weight="lg">
                  {text}
                </Text>
                <button onClick={onClose}>
                  <VariableIcon name="close" size={24} isHover className="p-1" />
                </button>
              </div>
              {!!onConfirm && (
                <Button onClick={onConfirm} className="mt-8 w-full">
                  확인
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
