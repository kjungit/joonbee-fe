import Webcam from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Webcam> = {
  title: 'Design System/Atoms/Webcam',
  component: Webcam,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Webcam>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {},
};
