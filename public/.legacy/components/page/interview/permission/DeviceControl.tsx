'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { RadiusButton } from '../../../common/RadiusButton';

import Webcam from '../../../common/Webcam';
import useVideo from '../../../../hooks/useVideo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { videoPermissionAtom } from '../../../../recoil/videoPermission/atom';
import { useModal } from '../../../../hooks/useModal';
import useBeforeUnload from '../../../../hooks/useBeforeUnload';
import AlertModal from '../../../ui/Modal/AlertModal';
import PreventBackModal from '../../../common/PreventBackModal';
import { TypeAnimation } from 'react-type-animation';
import PreventTabletModal from '../../../common/PreventTabletModal';
const sequence = [
  '마이크, 카메라 권한을 확인해주세요!',
  1000,
  '마이크 권한만으로도 면접은 가능해요!',
  1000,
  '마이크 권한만으로는 나의 면접 모습은 볼 수 없어요!',
  1000,
];
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

  const onChangeAudioBtnColor = () => {
    if (!audioStream) return 'light';
    return audioStream.active ? 'blue' : 'light';
  };

  const onChangeVideoBtnColor = () => {
    console.log(isPressedVideoBtn);
    return isPressedVideoBtn ? 'blue' : 'light';
  };

  useBeforeUnload();

  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <div className="bg-gray-light p-4 shadow-md rounded-2xl">
        <Webcam
          isPermitVideo={isPressedVideoBtn}
          size="md"
          className="mb-6"
          videoRef={videoRef}
          onStartVideo={onStartVideo}
        />
        <div className="flex gap-5 justify-between w-[584px]">
          <div className="flex gap-5">
            <RadiusButton
              color={onChangeAudioBtnColor()}
              text="sm"
              size="sm"
              onClick={onStartAudio}>
              마이크 권한 설정
            </RadiusButton>
            <RadiusButton
              color={onChangeVideoBtnColor()}
              text="sm"
              size="sm"
              onClick={onToggleVideo}>
              카메라 권한 설정
            </RadiusButton>
          </div>
          <RadiusButton
            color="blue"
            text="sm"
            size="sm"
            className="w-[120px]"
            onClick={onNavigate}
            disabled={isDisableNextBtn()}>
            다음
          </RadiusButton>
        </div>
      </div>
      <div className="text-white flex flex-col gap-3 items-center font-bold">
        <TypeAnimation
          sequence={sequence}
          speed={20}
          className="text-white font-bold text-3xl"
          repeat={Infinity}
        />
      </div>
      {isOpened && (
        <AlertModal
          title="알림"
          body="마이크를 연결해 주세요."
          isOpened={isOpened}
          onClose={onClose}
        />
      )}
      <PreventBackModal />
      <PreventTabletModal />
    </div>
  );
}
