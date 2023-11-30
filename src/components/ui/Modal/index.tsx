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

  const titles = getInnerComponents(children, modalTitleComponentType);
  const body = getInnerComponents(children, modalBodyComponentType);
  const closeButton = getInnerComponents(children, modalCloseButtonComponentType);
  const confirmButton = getInnerComponents(children, modalConfirmButtonComponentType);

  return (
    <>
      <>
        {isOpened &&
          createPortal(
            <div className="fixed top-0 left-0 w-full h-full z-10 ">
              <div className="z-20 h-full flex justify-center items-center opacity-100">
                <div
                  className="relative px-5 py-3 rounded-[8px] w-[360px] shadow-normal bg-white"
                  ref={modalRef}>
                  <div className="absolute right-4">
                    <VariableIcon onClick={onClose} name="close" />
                  </div>
                  {titles}
                  {body}
                  {(confirmButton || closeButton) && (
                    <div className="flex gap-5 justify-end">
                      {closeButton}
                      {confirmButton}
                    </div>
                  )}
                </div>
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
