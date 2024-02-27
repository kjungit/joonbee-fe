import Header from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  title: 'Design System/Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

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
