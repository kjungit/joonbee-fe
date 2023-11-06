import React from 'react';
import Image from 'next/image';

type IconProps = {
  size?: 'sm' | 'md';
};

const Logo = ({ size = 'sm' }: IconProps) => {
  const logo = require(`/public/icons/logo.png`);

  const textStyles = {
    sm: 29,
    md: 120,
  };

  return <Image src={logo} alt="JOONBEE Logo" width={textStyles[size]} height={textStyles[size]} />;
};

export default Logo;
