import type { Meta, StoryObj } from '@storybook/react';
import { QuestrionCard } from '.';

const meta: Meta<typeof QuestrionCard> = {
  title: 'DESIGN SYSTEM/Atoms/QuestrionCard',
  component: QuestrionCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['white', 'gray', 'navy'],
    },
    size: {
      description: 'The type of button',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuestrionCard>;

export const Primary: Story = {
  args: {
    size: `sm`,
    color: 'white',
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Secondary: Story = {
  args: {
    size: `md`,
    color: 'gray',
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Normal: Story = {
  args: {
    size: `lg`,
    color: 'white',
    children: 'react에 대해서 설명해주세요.',
  },
};
