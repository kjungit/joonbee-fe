import { selectedDeviceIdAtom } from '@/recoils/interview/atom';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

// 장치 유형을 인자로 받는 함수
export default function useGetDevice(deviceType: 'audio' | 'video') {
  const [deviceList, setDeviceList] = useState<{ label: string; deviceId: string }[]>([]);

  useEffect(() => {
    const getConnectedDevices = async () => {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const filteredDeviceList = allDevices
        .filter(device => device.kind === `${deviceType}input`)
        .map(device => ({
          label: device.label,
          deviceId: device.deviceId,
        }));

      setDeviceList(filteredDeviceList);
    };

    getConnectedDevices();
  }, [deviceType]);

  return {
    deviceList,
  };
}
