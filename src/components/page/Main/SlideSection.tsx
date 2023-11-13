import { IconName, StackLogo } from '@/components/common/StackLogo.tsx';
import { AutoSlider } from '@/components/ui/AutoSlider';
import React from 'react';
const firstStack: IconName[] = [
  'cc',
  'cshop',
  'docker',
  'git',
  'golang',
  'htmlcss',
  'java',
  'javascript',
  'typescript',
];
const secondStack: IconName[] = [
  'k8s',
  'kotlin',
  'mariadb',
  'mybecis',
  'nest',
  'next',
  'node',
  'postgressql',
  'ubuntu',
];
const thirdStack: IconName[] = [
  'python',
  'react',
  'rebbitMQ',
  'redhat',
  'redis',
  'spring',
  'svelt',
  'swift',
  'vue',
];

export default function SlideSection() {
  return (
    <div className="w-screen overflow-hidden flex flex-col items-center">
      <AutoSlider>
        {firstStack.map((item, index) => (
          <StackLogo key={index} name={item} />
        ))}
      </AutoSlider>
      <AutoSlider direction={true}>
        {secondStack.map((item, index) => (
          <StackLogo key={index} name={item} />
        ))}
      </AutoSlider>
      <AutoSlider>
        {thirdStack.map((item, index) => (
          <StackLogo key={index} name={item} />
        ))}
      </AutoSlider>
    </div>
  );
}
