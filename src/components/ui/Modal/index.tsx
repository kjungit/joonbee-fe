'use client';

import React from 'react';

import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import { VariableIcon } from '../VariableIcon';
import getInnerComponents from '@/utils/getInnerComponent';
import ModalTitle, { modalTitleComponentType } from './inner/ModalTitle';
import ModalBody, { modalBodyComponentType } from './inner/ModalBody';
import ModalCloseButton, { modalCloseButtonComponentType } from './inner/ModalCloseButton';
import ModalConfirmButton, { modalConfirmButtonComponentType } from './inner/ModalConfirmButton';
import { createPortal } from 'react-dom';

type AlertModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  isOpened: boolean;
};

export default function Modal({ children, onClose, isOpened = false }: AlertModalProps) {
  const { modalRef } = useModalOutsideClick(onClose);

  if (typeof window !== 'object') return;

  const modalPortalDiv = document.querySelector('#portal');
  if (!modalPortalDiv) {
    return null;
  }

  const title = getInnerComponents(children, modalTitleComponentType);
  const body = getInnerComponents(children, modalBodyComponentType);
  const closeButton = getInnerComponents(children, modalCloseButtonComponentType);
  const confirmButton = getInnerComponents(children, modalConfirmButtonComponentType);

  return (
    <>
      <>
        {isOpened &&
          createPortal(
            <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
              <div
                className="relative px-4 py-3 rounded-[8px] w-[360px] min-h-[160px] shadow-normal bg-white"
                ref={modalRef}>
                <div className="flex items-center justify-between">
                  {title}
                  <VariableIcon onClick={onClose} name="close" />
                </div>
                <div className="border border-gray-normal"></div>
                {body}
                {confirmButton && (
                  <div className="flex gap-5 justify-end">
                    {confirmButton}
                    {closeButton}
                  </div>
                )}
              </div>
            </div>,
            modalPortalDiv,
          )}
      </>
    </>
  );
}

Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.ConfirmButton = ModalConfirmButton;
Modal.CloseButton = ModalCloseButton;
