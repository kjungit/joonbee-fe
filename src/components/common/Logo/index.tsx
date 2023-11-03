import React from 'react';

import Image from 'next/image';

export interface IconProps {
  size: number;
}
const Logo = ({ size = 30 }: IconProps) => {
  const logo = require(`/public/icons/logo.png`);

  return <Image src={logo} alt="JOONBEE Logo" width={size} height={size} />;
};

export default Logo;
