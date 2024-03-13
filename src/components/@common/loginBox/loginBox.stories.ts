import type { Meta, StoryObj } from '@storybook/react';
import { LoginBox } from './loginBox';

const meta: Meta<typeof LoginBox> = {
  title: 'DESIGN SYSTEM/Molecules/LoginBox',
  component: LoginBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginBox>;

export const Primary: Story = {};
