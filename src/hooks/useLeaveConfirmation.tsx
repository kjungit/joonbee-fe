'use client';

import React, { useCallback } from 'react';
import { useModal } from './useModal';
import { useRouteChangeEvents } from 'nextjs-router-events';
import Modal from '@/components/ui/Modal';
import useBeforeUnload from './useBeforeUnload';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { routeAtom } from '@/recoil/route/atom';

export default function useLeaveConfirmation() {
  const { isOpened, onOpen, onClose } = useModal();
  const route = useRouter();
  const path = useRecoilValue(routeAtom);
  // console.log(path);
  const shouldPreventRouteChange = true;

  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      onOpen();
      return false;
    }

    return true;
  }, [shouldPreventRouteChange]);

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });
  useBeforeUnload(shouldPreventRouteChange);

  return {
    confirmationDialog: (
      <Modal isOpened={isOpened} onClose={onClose}>
        <Modal.Title>면접이 진행중입니다. 나가시겠습니까?</Modal.Title>
        <Modal.Body>페이지를 이동할 경우 지금까지 진행한 면접이 사라집니다.</Modal.Body>
        <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
        <Modal.ConfirmButton
          onClick={() => {
            route.push(`${path}`);
          }}>
          나가기
        </Modal.ConfirmButton>
      </Modal>
    ),
  };
}
