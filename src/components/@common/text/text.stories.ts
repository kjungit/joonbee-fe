import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';

const meta: Meta<typeof Text> = {
  title: 'Design System/Atoms/Text',
  component: Text,
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
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'gray',
    weight: 'md',
    children: 'Text',
  },
};
