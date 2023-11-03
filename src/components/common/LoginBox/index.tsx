'use client';
import Image from 'next/image';
import React from 'react';

export const LoginBox = () => {
  const image = require(`/public/icons/logo.png`);

  return (
    <div className="w-[410px] h-[580px] rounded-[50px] bg-white shadow-md">
      <Image src={image} width={120} height={120} alt={`로고`} />
      <p>JOONBEE 하세요.</p>
    </div>
  );
};
