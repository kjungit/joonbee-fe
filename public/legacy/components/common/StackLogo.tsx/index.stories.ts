import { StackLogo } from '.';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StackLogo> = {
  title: 'Design System/Atoms/StackLogo',
  component: StackLogo,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      option: [
        'cc',
        'cshop',
        'docker',
        'git',
        'golang',
        'htmlcss',
        'java',
        'javascript',
        'k8s',
        'kotlin',
        'mariadb',
        'mybecis',
        'nest',
        'next',
        'node',
        'postgressql',
        'python',
        'react',
        'rebbitMQ',
        'redhat',
        'redis',
        'spring',
        'svelte',
        'swift',
        'typescript',
        'ubuntu',
        'vue',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StackLogo>;

export const Primary: Story = {
  args: {
    name: 'react',
  },
};
