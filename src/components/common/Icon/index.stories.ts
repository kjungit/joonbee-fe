import React from 'react';
import { Icon } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      option: [
        'kakao',
        'naver',
        'google',
        'meeting',
        'service',
        'emptylike',
        'copy',
        'check',
        'random',
        'blank',
        'ai_white',
        'checklist',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    name: 'kakao',
  },
  parameters: {
    backgrounds: {
      values: [
        { name: 'white', value: '#fff' },
        { name: 'black', value: '#000' },
      ],
    },
  },
};
