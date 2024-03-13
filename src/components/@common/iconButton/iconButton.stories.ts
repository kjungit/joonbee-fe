import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './iconButton';
import { AllIconList } from '@/constants/icon';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Molecules/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'auto'],
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'white', 'disabled'],
    },
    iconName: {
      control: 'select',
      options: AllIconList,
    },
    edge: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
  },
  args: {
    iconName: 'leftArrow',
    size: 'auto',
    color: 'primary',
    children: '버튼',
    edge: 'start',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};
