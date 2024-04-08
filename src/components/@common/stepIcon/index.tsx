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
    <div className="inline-flex items-center mt-3">
      <div className="flex flex-col items-center gap-0.5">
        <div className={`w-4 h-4 rounded-full ${backgroundColor} relative`}>
          {isIcon ? (
            <Icon name="check.png" />
          ) : (
            <Text
              weight={fontWeight}
              size="sm"
              color={color}
              className="flex justify-center itemes-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {count}
            </Text>
          )}
        </div>
        <Text weight={fontWeight} size="sm" color={color}>
          {text}
        </Text>
      </div>
    </div>
  );
}
