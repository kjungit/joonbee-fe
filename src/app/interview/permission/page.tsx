'use client';

import Button from '@/components/@common/button';
import { Icon } from '@/components/@common/icon';
import IconButton from '@/components/@common/iconButton';
import InterviewLoading from '@/components/@common/interviewLoading';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import Video from '@/components/@common/video/video';
import DeviceSelect from '@/components/@pages/interview/permission/DeviceSelect';
import { Category, MainCategory } from '@/constants/category';
import useGetDevice from '@/hooks/interview/useGetDevice';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import useVideo from '@/hooks/interview/useVideo';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import { interviewQuestionCountAtom, interviewTimeAtom } from '@/recoils/interview/atom';
import { convertSecondsToMinutes } from '@/utils/format';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function PermissionPage() {
  const { videoDevices, getConnectedDevices, selectDevice, selectedDeviceId, audioDevices } =
    useGetDevice();
  const time = useRecoilValue(interviewTimeAtom);
  const mySelectCategory = useRecoilValue(mySelectQuestionCategoryState);
  const questionCount = useRecoilValue(interviewQuestionCountAtom);
  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/progress');

  const { onStartVideo, videoRef } = useVideo();

  useEffect(() => {
    const startDevices = async () => {
      await onStartVideo();
      getConnectedDevices();
    };

    startDevices();
  }, []);

  return (
    <>
      {isPressedBtn ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
          <InterviewLoading />
          <Text size="xl">면접을 준비중입니다</Text>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <div className="mb-6">
              <Text as="h3" size="lg" weight="lg" className="mb-2">
                장치 권한 설정
              </Text>
              {videoRef ? (
                <Video videoRef={videoRef} />
              ) : (
                <div className={`bg-black shadow-md rounded-2xl w-[362px] h-[230px]`}></div>
              )}
            </div>
          </div>
          <div className="flex gap-8 items-center">
            <DeviceSelect
              deviceType="video"
              devices={videoDevices}
              selectedId={selectedDeviceId.videoId}
              onSelect={videoId => selectDevice('video', videoId)}
            />
          </div>
          <div className="flex gap-8 items-center">
            <DeviceSelect
              deviceType="audio"
              devices={audioDevices}
              selectedId={selectedDeviceId.audioId}
              onSelect={audioId => selectDevice('audio', audioId)}
            />
          </div>

          <Text size="md" weight="lg" className="mb-20">
            * 카메라는 필수가 아니지만 마이크는 필수에요!
          </Text>
          <ul className="flex gap-5 absolute">
            <li className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
              {MainCategory[mySelectCategory.category]}
            </li>
            <li className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
              질문 {questionCount}개
            </li>
            <li className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
              {convertSecondsToMinutes(time)}
            </li>
          </ul>
          <IconButton
            iconName="next_arrow.png"
            edge="end"
            size="md"
            className="absolute bottom-14 right-[300px]"
            onClick={onMovePage}>
            다음 단계
          </IconButton>
          <div className="absolute bottom-14 right-14">
            <Image src="/white_desk.png" alt="white_desk" width={180} height={180} />
          </div>
        </>
      )}
    </>
  );
}
