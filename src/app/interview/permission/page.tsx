'use client';

import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import Video from '@/components/@common/video/video';
import DeviceSelect from '@/components/@pages/interview/permission/DeviceSelect';
import useAudio from '@/hooks/useAudio';
import useGetDevice from '@/hooks/useGetDevice';
import useVideo from '@/hooks/useVideo';
import React, { useEffect } from 'react';

export default function PermissionPage() {
  const { videoDevices, getConnectedDevices, selectDevice, selectedDeviceIds, audioDevices } =
    useGetDevice();
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
    </>
  );
}
