import React from 'react';
import Modal from '..';

type AlertModalProps = {
  isOpened: boolean;
  onClose: () => void;
  title: string;
  body: string;
};

export default function AlertModal({ isOpened, onClose, title, body }: AlertModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Body>{body}</Modal.Body>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
}
