import { ToggleItem } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToggleItem> = {
  title: 'Design System/Atoms/ToggleItem',
  component: ToggleItem,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'radio',
      options: ['lightGray', 'gray', 'darkGray', 'black', 'white'],
    },
    weight: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '4xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleItem>;

export const Default: Story = {
  args: {},
};
