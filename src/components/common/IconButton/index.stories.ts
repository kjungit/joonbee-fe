import React from 'react';
import { SocialLoginButton } from './';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SocialLoginButton> = {
  title: 'Design System/Molecule/SocialLoginButton',
  component: SocialLoginButton,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['kakao', 'naver', 'google'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof SocialLoginButton>;

export const Primary: Story = {
  args: {
    name: 'kakao',
  },
};
