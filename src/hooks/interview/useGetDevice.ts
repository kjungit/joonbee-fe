import { selectedDeviceIdAtom } from '@/recoils/interview/atom';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useGetDevice() {
  const [videoDevices, setVideoDevices] = useState<{ label: string; deviceId: string }[]>([]);
  const [audioDevices, setAudioDevices] = useState<{ label: string; deviceId: string }[]>([]);

  const [selectedDeviceId, setSelectedDeviceId] = useRecoilState(selectedDeviceIdAtom);

  const getConnectedDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    const videoDeviceInfo = devices
      .filter(device => device.kind === 'videoinput')
      .map(device => ({
        label: device.label,
        deviceId: device.deviceId,
      }));
    setVideoDevices(videoDeviceInfo);

    const audioDeviceInfo = devices
      .filter(device => device.kind === 'audioinput')
      .map(device => ({
        label: device.label,
        deviceId: device.deviceId,
      }));
    setAudioDevices(audioDeviceInfo);
  };

  const selectDevice = (deviceType: 'video' | 'audio', deviceId: string) => {
    setSelectedDeviceId(prev => ({
      ...prev,
      [`${deviceType}Id`]: deviceId,
    }));
  };

  return {
    videoDevices,
    audioDevices,
    getConnectedDevices,
    selectedDeviceId,
    selectDevice,
  };
}
