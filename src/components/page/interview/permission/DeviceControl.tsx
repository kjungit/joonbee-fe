'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { RadiusButton } from '@/components/common/RadiusButton';

import Webcam from '@/components/common/Webcam';
import useVideo from '@/hooks/useVideo';
import { useRecoilState } from 'recoil';
import { videoPermissionAtom } from '@/recoil/videoPermission/atom';
import DeviceSettinModal from '@/components/ui/Modal/DeviceSettingModal';
import { useModal } from '@/hooks/useModal';

const DeviceControl = () => {
  const [isPressedVideoBtn, setIsPressedVideoBtn] = useRecoilState(videoPermissionAtom);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const { isOpened, onClose, onOpen } = useModal();

  const { videoRef, onStartVideo } = useVideo();

  const router = useRouter();

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
      onOpen()
    }
  };

  const onNavigate = () => {
    router.push('/interview/start');
  };

  const isDisableNextBtn = () => {
    return !audioStream || !audioStream.active;
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Webcam
        isPermitVideo={isPressedVideoBtn}
        size="md"
        className="mb-10"
        videoRef={videoRef}
        onStartVideo={onStartVideo}
      />
      <div>
        <div className="flex justify-between mb-6">
          <RadiusButton color="light" text="md" size="sm" onClick={onStartAudio}>
            마이크 권한 설정
          </RadiusButton>
          <RadiusButton color="light" text="md" size="sm" onClick={onToggleVideo}>
            카메라 권한 설정
          </RadiusButton>
        </div>
        <RadiusButton
          color="blue"
          text="md"
          size="md"
          onClick={onNavigate}
          disabled={isDisableNextBtn()}>
          다음
        </RadiusButton>
      </div>
      <DeviceSettinModal isOpened={isOpened} onClose={onClose} />
    </div>
  );
};

export default DeviceControl;
