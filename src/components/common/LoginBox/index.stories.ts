import type { Meta, StoryObj } from '@storybook/react';
import { LoginBox } from '.';

const meta: Meta<typeof LoginBox> = {
  title: 'DESIGN SYSTEM/Atoms/LoginBox',
  component: LoginBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginBox>;

export const Primary: Story = {};
