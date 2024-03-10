'use client';
import React from 'react';
import Image from 'next/image';

export type IconName =
  | 'cc'
  | 'cshop'
  | 'docker'
  | 'git'
  | 'golang'
  | 'htmlcss'
  | 'java'
  | 'javascript'
  | 'k8s'
  | 'kotlin'
  | 'mariadb'
  | 'mybecis'
  | 'nest'
  | 'next'
  | 'node'
  | 'postgressql'
  | 'python'
  | 'react'
  | 'rebbitMQ'
  | 'redhat'
  | 'redis'
  | 'spring'
  | 'svelt'
  | 'swift'
  | 'typescript'
  | 'ubuntu'
  | 'vue';

export interface IconProps {
  name: IconName;
}

export const StackLogo = ({ name }: IconProps) => {
  const icon = require(`/public/icons/logo/${name}.png`);

  return (
    <div className="w-[200px] h-[100px] rounded-md my-4 shadow-md bg-white flex items-center justify-center">
      <Image src={icon} alt={icon} />
    </div>
  );
};
