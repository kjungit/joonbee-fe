'use client';

import Link from 'next/link';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { routeAtom } from '../../../recoil/route/atom';

export default function LogoText() {
  const setRoute = useSetRecoilState(routeAtom);

  return (
    <Link legacyBehavior href="/">
      <a onMouseOver={() => setRoute('/')} className="flex gap-3 items-center">
        <h2 className="text-blue-secondary text-[24px] font-bold">JOONBEE</h2>
      </a>
    </Link>
  );
}
