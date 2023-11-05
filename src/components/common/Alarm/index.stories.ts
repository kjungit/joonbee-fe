import React from 'react';
import Alarm from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Alarm> = {
  title: 'Design System/Molecules/Alarm',
  component: Alarm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        iframeHeight: 600,
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Alarm>;

export const Primary: Story = {
  args: {
    data: {
      isAlarmMessage: true,
      alarm: [
        {
          id: 'ffq',
          title: '내 질문이 추천받았어요.',
          time: '오전 01:20',
        },
        {
          id: 'fad3',
          title: '내 질문이 추천받았어요.',
          time: '오전 01:20',
        },
        {
          id: 'dfsz',
          title: '내 질문이 추천받았어요.',
          time: '오전 01:20',
        },
        {
          id: 'df24',
          title: '내 질문이 추천받았어요.',
          time: '오전 01:20',
        },
      ],
    },
  },
};
