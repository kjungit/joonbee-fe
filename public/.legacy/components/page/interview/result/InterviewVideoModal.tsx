'use client';

import { Button } from '../../../ui/Button';
import ModalPortal from '../../../ui/ModalPortal';
import { VariableIcon } from '../../../ui/VariableIcon';
import useVideo from '../../../../hooks/useVideo';
import { interviewVideoUrlAtom } from '../../../../recoil/interviewVideoUrl/atom';
import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';

type InterviewVideoModalProps = {
  onClose: () => void;
};

export default function InterviewVideoModal({ onClose }: InterviewVideoModalProps) {
  const videoUrl = useRecoilValue(interviewVideoUrlAtom);
  const { onDownload } = useVideo();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <ModalPortal>
      <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen  bg-black/60 shadow-md flex items-center justify-center">
        <div className="w-[540px]  rounded-xl bg-white shadow-md relative p-5">
          <div className="flex justify-between mb-5">
            <h2 className="text-[18px] font-bold">INTERVIEW 영상</h2>
            <VariableIcon onClick={onClose} name="close" className="absolute right-5 top-5" />
          </div>
          <div className="flex flex-col">
            <video height="440" controls ref={videoRef} className="mb-3">
              <source src={videoUrl} type="video/webm" />
              브라우저가 비디오를 지원하지 않습니다.
            </video>
            <Button
              color="bluePrimary"
              text="sm"
              size="auto"
              onClick={() => onDownload(videoUrl)}
              className="mb-2">
              영상 다운로드
            </Button>
            <Button color="blueTertiary" text="sm" size="auto" onClick={videoPlay}>
              영상 재생
            </Button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
