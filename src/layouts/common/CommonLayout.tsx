'use client';
import Footer from '@/components/common/Footer';
import { ROUTES } from '@/constants/route';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';

export default function CommonLayout({ children }: PropsWithChildren<{}>) {
  const pathname = usePathname() as '/' | '/questions' | '/my';
  const isMatchedRoute = Object.values(ROUTES).includes(pathname);

  useEffect(() => {
    console.log(pathname);
  }, []);
  return (
    <>
      {children}
      {isMatchedRoute && <Footer />}
    </>
  );
}
