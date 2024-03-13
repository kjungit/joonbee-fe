import React, { useState } from 'react';

export default function useGetDevice() {
  const [videoDevices, setVideoDevices] = useState<{ label: string; deviceId: string }[]>([]);
  const [audioDevices, setAudioDevices] = useState<{ label: string; deviceId: string }[]>([]);
  const [selectedDeviceIds, setSelectedDeviceIds] = useState<{
    videoId: string;
    audioId: string;
  }>({ videoId: '', audioId: '' });

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
    setSelectedDeviceIds(prev => ({
      ...prev,
      [`${deviceType}Id`]: deviceId,
    }));
  };

  return { videoDevices, audioDevices, getConnectedDevices, selectedDeviceIds, selectDevice };
}
