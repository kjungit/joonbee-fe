'use client';

import IconButton from '@/components/@common/iconButton';
import InterviewLoading from '@/components/@common/interviewLoading';
import PreventBackModal from '@/components/@common/preventBackModal';
import { Text } from '@/components/@common/text';
import Video from '@/components/@common/video/video';
import DeviceSelect from '@/components/@pages/interview/permission/DeviceSelect';
import { Category, MainCategory } from '@/constants/category';
import useGetDevice from '@/hooks/interview/useGetDevice';
import useRedirectButtonClick from '@/hooks/interview/useRedirectButtonClick';
import useVideo from '@/hooks/interview/useVideo';
import useBeforeUnload from '@/hooks/useBeforeUnload';
import { mySelectQuestionCategoryState } from '@/recoils/home/question/mySelectQuestionCategory/atom';
import {
  interviewQuestionCountAtom,
  interviewTimeAtom,
  selectedDeviceIdAtom,
} from '@/recoils/interview/atom';
import { convertSecondsToMinutes } from '@/utils/format';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PermissionPage() {
  const { deviceList: videoDeviceList } = useGetDevice('video');
  const { deviceList: audioDeviceList } = useGetDevice('audio');

  const [selectedDeviceId, setSelectedDeviceId] = useRecoilState(selectedDeviceIdAtom);

  const time = useRecoilValue(interviewTimeAtom);
  const mySelectCategory = useRecoilValue(mySelectQuestionCategoryState);
  const questionCount = useRecoilValue(interviewQuestionCountAtom);
  const { onMovePage, isPressedBtn } = useRedirectButtonClick('/interview/progress');

  const { onStart, videoRef } = useVideo();

  const handleSelectDevice = (deviceId: string, deviceType: 'video' | 'audio') => {
    setSelectedDeviceId(prev => ({
      ...prev,
      [`${deviceType}Id`]: deviceId,
    }));
  };

  useEffect(() => {
    onStart();
  }, [selectedDeviceId]);

  useEffect(() => {
    if (videoDeviceList[0]?.deviceId) handleSelectDevice(videoDeviceList[0].deviceId, 'video');
    if (audioDeviceList[0]?.deviceId) handleSelectDevice(audioDeviceList[0].deviceId, 'audio');
  }, [videoDeviceList, audioDeviceList]);

  useBeforeUnload();

  return (
    <>
      {isPressedBtn ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col flex-inline items-center gap-5">
          <InterviewLoading />
          <Text size="xl">면접을 준비중입니다</Text>
        </div>
      ) : (
        <div className="py-14 flex flex-col justify-between h-full">
          <Text as="h2" size="xl" weight="lg" className="mb-5">
            장치 권한 설정
          </Text>
          <div className="max-w-[400px] mb-8">
            <div className="mb-5">
              {selectedDeviceId.videoId == '1' ? (
                <div
                  className={`bg-black shadow-md rounded-2xl w-full h-[240px] flex items-center justify-center`}>
                  <Image
                    src="/basicProfile.png"
                    alt="white_desk"
                    width={80}
                    height={80}
                    className="opacity-50"
                  />
                </div>
              ) : (
                <Video videoRef={videoRef} />
              )}
            </div>
            <Text size="md" className="mb-2" color="blue">
              * 카메라는 필수가 아니지만 마이크는 필수에요!
            </Text>
            <DeviceSelect
              deviceType="video"
              deviceList={videoDeviceList}
              selectedId={selectedDeviceId.videoId}
              onSelect={videoId => handleSelectDevice(videoId, 'video')}
            />
            <DeviceSelect
              deviceType="audio"
              deviceList={audioDeviceList}
              selectedId={selectedDeviceId.audioId}
              onSelect={audioId => handleSelectDevice(audioId, 'audio')}
            />
            <Text size="md" className="mb-2" color="blue">
              * 면접 영상은 저장되지 않아요. 일회성으로 면접이 끝난 후 확인이 가능하며, 면접 결과
              페이지를 나가면 파기됩니다.
            </Text>
          </div>
          <div className="flex justify-between w-full">
            <ul className="flex gap-5">
              <li className="text-sm w-[120px] h-[48px] bg-main-primary rounded-lg text-white flex items-center justify-center">
                {MainCategory[mySelectCategory.category]}
              </li>
              <li className="text-sm w-[120px] h-[48px] bg-main-primary rounded-lg text-white flex items-center justify-center">
                질문 {questionCount}개
              </li>
              <li className="text-sm w-[120px] h-[48px] bg-main-primary rounded-lg text-white flex items-center justify-center">
                {convertSecondsToMinutes(time)}
              </li>
            </ul>
            <IconButton
              iconName="next_arrow.png"
              edge="end"
              size="md"
              onClick={onMovePage}
              disabled={!selectedDeviceId.audioId}>
              다음 단계
            </IconButton>
          </div>
          <div className="absolute top-14 right-14">
            <Image src="/white_desk.png" alt="white_desk" width={180} height={180} />
          </div>
        </div>
      )}
      <PreventBackModal />
    </>
  );
}
