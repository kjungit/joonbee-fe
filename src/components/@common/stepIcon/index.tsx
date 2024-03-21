import React from 'react';
import { Text, TextColor, TextWeight } from '../text';
import { Icon } from '../icon';
import { ProgressStatus } from '@/types';

const PROGRESS_STATUS = {
  READY: {
    isIcon: false,
    backgroundColor: 'bg-white border border-gray-normal',
    color: 'lightGray' as TextColor,
    fontWeight: 'md' as TextWeight,
  },
  PROGRESS: {
    isIcon: false,
    backgroundColor: 'bg-gray-normal',
    color: 'black' as TextColor,
    fontWeight: 'md' as TextWeight,
  },
  DONE: {
    isIcon: true,
    borderStyels: '',
    backgroundColor: 'bg-[#4F7EEC]',
    color: 'lightGray' as TextColor,
    fontWeight: 'lg' as TextWeight,
  },
};

interface StepIconProps {
  progress: ProgressStatus;
  text?: string;
  count?: number;
}

export default function StepIcon({ progress, text = '면접 시작', count = 1 }: StepIconProps) {
  const { color, isIcon, backgroundColor, fontWeight } = PROGRESS_STATUS[progress];
  return (
    <div className="inline-flex items-center">
      <div className="flex flex-col items-center gap-0.5">
        <div className={`w-4 h-4 rounded-full ${backgroundColor}`}>
          {isIcon ? (
            <Icon name="check.png" />
          ) : (
            <Text
              weight={fontWeight}
              size="sm"
              color={color}
              className="flex justify-center itemes-center">
              {count}
            </Text>
          )}
        </div>
        <Text weight={fontWeight} size="xs" color={color}>
          {text}
        </Text>
      </div>
    </div>
  );
}
