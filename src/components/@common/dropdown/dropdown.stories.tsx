import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    color: {
      control: 'inline-radio',
      options: ['white', 'primary', 'disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    size: 'md',
    data: ['fe', 'be', 'language', 'cs', 'mobile', 'etc'],
    title: '카테고리',
    color: 'white',
  },
};
