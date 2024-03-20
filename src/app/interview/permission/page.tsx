'use client';

import IconButton from '@/components/@common/iconButton';
import InterviewLoading from '@/components/@common/interviewLoading/interviewLoading';
import { Text } from '@/components/@common/text';
import Video from '@/components/@common/video/video';
import DeviceSelect from '@/components/@pages/interview/permission/DeviceSelect';
import { Category, MainCategory } from '@/constants/category';
import useGetDevice from '@/hooks/interview/useGetDevice';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import useVideo from '@/hooks/interview/useVideo';
import {
  interviewQuestionCountAtom,
  interviewRandomCategoryAtom,
  interviewTimeAtom,
} from '@/recoils/interview/atom';
import { convertSecondsToMinutes } from '@/utils/format';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function PermissionPage() {
  const { videoDevices, getConnectedDevices, selectDevice, selectedDeviceIds, audioDevices } =
    useGetDevice();
  const time = useRecoilValue(interviewTimeAtom);
  const category = useRecoilValue(interviewRandomCategoryAtom);
  const questionCount = useRecoilValue(interviewQuestionCountAtom);
  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/progress');

  const { onStartVideo, videoRef } = useVideo();
  console.log('test');

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
        <InterviewLoading />
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
          <DeviceSelect
            deviceType="video"
            devices={videoDevices}
            selectedId={selectedDeviceIds.videoId}
            onSelect={videoId => selectDevice('video', videoId)}
          />
          <DeviceSelect
            deviceType="audio"
            devices={audioDevices}
            selectedId={selectedDeviceIds.audioId}
            onSelect={audioId => selectDevice('audio', audioId)}
          />
          <Text size="md" weight="lg">
            * 카메라는 필수가 아니지만 마이크는 필수에요!
          </Text>
          <ul className="flex gap-5">
            <li className="w-[140px] h-[50px] bg-main-primary rounded-lg text-white flex items-center justify-center font-bold">
              {MainCategory[category]}
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
            className="absolute bottom-0"
            onClick={onMovePage}>
            다음 단계
          </IconButton>
        </>
      )}
    </>
  );
}
