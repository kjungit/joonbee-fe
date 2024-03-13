import type { Meta, StoryObj } from '@storybook/react';
import { RadioButtonGroup } from './radioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'DESIGN SYSTEM/Atoms/RadioButtonGroup',
  component: RadioButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioButtonGroup>;

export const Primary: Story = {
  args: {
    data: [
      { id: '1', text: '1분' },
      { id: '2', text: '1분 30초' },
      { id: '3', text: '2분' },
    ],
  },
};
