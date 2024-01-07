'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { RadiusButton } from '@/components/common/RadiusButton';

import Webcam from '@/components/common/Webcam';
import useVideo from '@/hooks/useVideo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import { useModal } from '@/hooks/useModal';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import AlertModal from '@/components/ui/Modal/AlertModal';

export default function DeviceControl() {
  const [isPressedVideoBtn, setIsPressedVideoBtn] = useRecoilState(videoPermissionAtom);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const { isOpened, onClose, onOpen } = useModal();

  const router = useRouter();

  const { videoRef, onStartVideo } = useVideo();

  const onToggleVideo = async () => {
    setIsPressedVideoBtn(prev => !prev);
  };

  const onStartAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(stream);
    } catch {
      onOpen();
    }
  };

  const onNavigate = () => {
    router.push('/interview/start');
  };

  const isDisableNextBtn = () => {
    return !audioStream || !audioStream.active;
  };

  useBeforeUnload();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="bg-gray-light p-4 shadow-md rounded-lg">
        <Webcam
          isPermitVideo={isPressedVideoBtn}
          size="md"
          className="mb-6"
          videoRef={videoRef}
          onStartVideo={onStartVideo}
        />
        <div className="flex gap-5 justify-between w-[584px]">
          <div className="flex gap-5">
            <RadiusButton color="light" text="xs" size="xs" onClick={onStartAudio}>
              마이크 권한 설정
            </RadiusButton>
            <RadiusButton color="light" text="xs" size="xs" onClick={onToggleVideo}>
              카메라 권한 설정
            </RadiusButton>
          </div>
          <RadiusButton
            color="blue"
            text="xs"
            size="xs"
            className="w-[120px]"
            onClick={onNavigate}
            disabled={isDisableNextBtn()}>
            다음
          </RadiusButton>
        </div>
      </div>
      {isOpened && (
        <AlertModal
          title="알림"
          body="마이크를 연결해 주세요."
          isOpened={isOpened}
          onClose={onClose}
        />
      )}
    </div>
  );
}
