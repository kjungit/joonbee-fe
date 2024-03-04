import React from 'react';
import { ToggleItemList } from '../@common/ToggleList';

export default function Navbar() {
  return (
    <div className="min-w-[260px] h-screen effect-white h-full  effect-white">
      <div className="h-[60px] flex items-center justify-center effect-white">
        <p className="font-bold">로그인을 해주세요</p>
      </div>
      <ToggleItemList />
    </div>
  );
}
