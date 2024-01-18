import type { Meta, StoryObj } from '@storybook/react';
import { CartClipboard } from '.';

const meta: Meta<typeof CartClipboard> = {
  title: 'DESIGN SYSTEM/Atoms/CartClipboard',
  component: CartClipboard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      description: 'The color of the button',
      control: 'inline-radio',
      options: ['white', 'black'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CartClipboard>;

export const Primary: Story = {
  args: {
    color: 'text-white',
    item: {
      questionId: '123',
      categoryId: 12,
      categoryName: 'fe',
      questionContent: 'test',
      subcategoryName: 'react',
    },
  },
};
