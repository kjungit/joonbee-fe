import type { Meta, StoryObj } from '@storybook/react';
import { LineQuestrionCard } from '.';

const meta: Meta<typeof LineQuestrionCard> = {
  title: 'atoms/LineQuestrionCard',
  component: LineQuestrionCard,
  argTypes: {
    size: {
      description: 'The size of the button',
      control: 'inline-radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      description: 'The color of the button',
      control: 'inline-radio',
      options: ['white', 'gray'],
    },
    fontSize: {
      description: 'The fontSize of the button',
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
    borderPosition: {
      description: 'The borderPosition of the button',
      control: 'inline-radio',
      options: ['left', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LineQuestrionCard>;

export const Primary: Story = {
  args: {
    size: `sm`,
    color: 'white',
    fontSize: 'md',
    borderPosition: 'left',
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Secondary: Story = {
  args: {
    size: `md`,
    color: 'gray',
    fontSize: 'md',
    borderPosition: 'left',
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Tertiary: Story = {
  args: {
    size: `lg`,
    color: 'white',
    fontSize: 'md',
    borderPosition: 'left',
    children: 'react에 대해서 설명해주세요.',
  },
};

export const Quaternary: Story = {
  args: {
    size: `xl`,
    color: 'white',
    fontSize: 'md',
    borderPosition: 'left',
    children: 'react에 대해서 설명해주세요.',
  },
};
