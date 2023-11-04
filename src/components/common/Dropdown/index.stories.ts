import React from 'react';
import Dropdown from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    data: {},
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    size: 'md',
    data: ['프론트엔드', '백엔드', '언어', 'CS', '모바일','기타'],
    title: '카테고리',
  },
};
