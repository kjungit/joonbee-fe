'use client';
import { Icon } from '@/components/@common/icon';
import { Text } from '@/components/@common/text';
import { VariableIcon } from '@/components/@common/variableIcon';
import React, { useEffect } from 'react';

interface Device {
  deviceId: string;
  label: string;
}

interface DeviceSelectProps {
  deviceType: 'audio' | 'video';
  devices: Device[];
  selectedId: string;
  onSelect: (deviceId: string) => void;
}

export default function DeviceSelect({
  deviceType,
  devices,
  selectedId,
  onSelect,
}: DeviceSelectProps) {
  const deviceTypeName = deviceType === 'audio' ? '오디오' : '비디오';

  useEffect(() => {
    if (devices[0]?.deviceId) onSelect(devices[0].deviceId);
  }, [devices]);

  return (
    <div className="flex items-center gap-2 mb-4">
      <VariableIcon name={deviceType} size={16} />
      <Text as="h3" size="lg" weight="lg">
        {deviceTypeName}
      </Text>
      <select
        defaultValue={devices[0]?.deviceId}
        onChange={e => onSelect(e.target.value)}
        value={selectedId}
        className="border border-gray-light rounded px-2 py-1 w-[310px]">
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || '알 수 없는 장치'}
          </option>
        ))}
        {deviceType === 'video' && <option value="1">비디오 사용 안함</option>}
      </select>
      {!!selectedId && <Icon name="check.png" className="w-4 h-4" />}
    </div>
  );
}
