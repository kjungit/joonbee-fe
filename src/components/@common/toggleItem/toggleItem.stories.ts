import type { Meta, StoryObj } from '@storybook/react';
import { ToggleItem } from './toggleItem';

const meta: Meta<typeof ToggleItem> = {
  title: 'Design System/Atoms/ToggleItem',
  component: ToggleItem,
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: { type: 'object' },
      description: 'Toggle Item',
      defaultValue: {
        id: '1',
        value: 'Toggle Item',
        isOpen: false,
        children: [],
      },
    },
    onClickOpen: {
      control: 'boolean',
    },
  },
};
export default meta;
type Story = StoryObj<typeof ToggleItem>;

export const Primary: Story = {
  args: {
    item: {
      id: 'fe',
      value: '프론트엔드',
      isOpen: false,
      children: [],
    },
    onClickOpen: item => ({ ...item, isOpen: !item.isOpen }),
  },
};
