import React from 'react';
import Dropdown from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    color: {
      control: 'inline-radio',
      options: ['white', 'darkNavy'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {
  args: {
    size: 'md',
    data: ['프론트엔드', '백엔드', '언어', 'CS', '모바일', '기타'],
    title: '카테고리',
    color: 'white',
  },
};

export const Secondary: Story = {
  args: {
    size: 'sm',
    data: ['프론트엔드', '백엔드', '언어', 'CS', '모바일', '기타'],
    title: '카테고리',
    color: 'darkNavy',
  },
};
