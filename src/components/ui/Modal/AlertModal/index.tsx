import React from 'react';
import Modal from '..';

type AlertModalProps = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  body: string;
  onConfirm?: () => void;
};

export default function AlertModal({ isOpened, onClose, title, body, onConfirm }: AlertModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>{body}</Modal.Body>
      {onConfirm && <Modal.ConfirmButton onClick={onConfirm}>확인</Modal.ConfirmButton>}
    </Modal>
  );
}
