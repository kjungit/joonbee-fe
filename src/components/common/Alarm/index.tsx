'use client';
import React, { useState } from 'react';
import { VariableIcon } from '@/components/ui/VariableIcon';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';

type AlarmProps = {
  data: any;
};

const Alarm = ({ data }: AlarmProps) => {
  const { isAlarmMessage, alarm } = data;
  const [isAlarm, setIsAlarm] = useState(isAlarmMessage);
  const { isOpened, toggleModal, modalRef } = useModalOutsideClick();

  return (
    <div className="relative flex flex-col gap-2 justify-center">
      <VariableIcon size={24} name="alarm" onClick={toggleModal} />
      {isAlarm && (
        <div className="absolute w-[6px] h-[6px] bg-status-alert rounded-full left-5 top-[4px] animate-ping" />
      )}
      {isOpened && (
        <ul
          ref={modalRef}
          className="absolute z-10 top-9 -left-[230px] w-[270px] h-[240px] rounded-[10px] shadow-normal p-[14px] overflow-y-scroll scroll-hide bg-white">
          {!isAlarm ? (
            <p className="font-bold text-[14px] text-center">알림이 현재 없습니다.</p>
          ) : (
            alarm.map((item: any) => (
              <li key={item.id} className="flex flex-col gap-2">
                <div className="flex gap-1 items-baseline">
                  <p className="font-bold text-[12px] text-blue-secondary">알림</p>
                  <p className="text-[10px] text-gray-normal">{item.time}</p>
                </div>
                <h2 className="font-bold text-[14px]">{item.title}</h2>
                <div className="border-b-2 border-gray-normal mb-2" />
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Alarm;
