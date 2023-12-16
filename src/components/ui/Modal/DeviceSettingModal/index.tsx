import React from 'react';
import Modal from '..';

type DeviceSettingModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

export default function DeviceSettingModal({ isOpened, onClose }: DeviceSettingModalProps) {
  return (
    <Modal isOpened={isOpened} onClose={onClose}>
      <Modal.Title>장치를 연결해주세요</Modal.Title>
      <Modal.Body>장치를 찾을 수 없습니다.</Modal.Body>
      <Modal.CloseButton onClick={onClose}>취소</Modal.CloseButton>
    </Modal>
  );
}
