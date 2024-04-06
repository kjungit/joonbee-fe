'use client';
import { useEffect, useRef, useState } from 'react';
import ModalPortal from '../modalPortal';
import Logo from '../logo';
import Image from 'next/image';
import { Text } from '../text';

export const ViewSizeCheck = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        // 화면 크기가 1200 이하일 때
        if (ref.current) {
          ref.current.style.display = 'block';
        }
      } else {
        // 화면 크기가 1200 초과일 때
        if (ref.current) {
          ref.current.style.display = 'none';
        }
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed z-40 bg-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full h-full shadow-md flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
        <Logo size="lg" />
        <Image src="/main_logo_font.png" alt="main_logo" width={120} height={200} />
        <div className="flex flex-col items-center gap-1">
          <Text size="xl" weight="lg" className="text-blue-normal text-center">
            AI 면접서비스는 넓은 PC화면에서만 가능합니다.
          </Text>

          <Text size="md" weight="lg" className="text-blue-normal text-center">
            모바일 버전도 준비중이니 양해부탁드립니다.
          </Text>
        </div>
      </div>
    </div>
  );
};
