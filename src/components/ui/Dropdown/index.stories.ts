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
    data: ['fe', 'be', 'language', 'cs', 'mobile', 'etc'],
    title: '카테고리',
    color: 'white',
  },
};

export const Secondary: Story = {
  args: {
    size: 'sm',
    data: ['fe', 'be', 'language', 'cs', 'mobile', 'etc'],
    title: '카테고리',
    color: 'darkNavy',
  },
};
