import React from 'react';
import Button from '../button';
import { useRecoilState } from 'recoil';
import { interviewTimeAtom } from '@/recoils/interview/atom';
import { Text } from '../text';
import usePermitDevice from '@/hooks/interview/usePermitDevice';

interface PermissionButtonGroupProps {
  setDisabled: (disabled: boolean) => void;
}

export default function PermissionButtonGroup({ setDisabled }: PermissionButtonGroupProps) {
  const { checkAudioPermission, checkVideoPermission } = usePermitDevice();

  return (
    <div className="">
      <Text as="h3" size="lg" className="mb-2">
        마이크, 카메라 권한을 설정해주세요
        <Text color="blue" as="span">
          &nbsp;&nbsp;* 마이크는 필수입니다
        </Text>
      </Text>
      <div className="flex gap-10">
        <p className="min-w-[120px] h-[48px] bg-main-primary text-white flex justify-center items-center rounded-md text-[14px]">
          장치 권한
        </p>
        <div className="flex gap-5">
          <Button size="sm3" color="white" className="shadow-md" onClick={checkVideoPermission}>
            카메라 허용
          </Button>
          <Button
            size="sm3"
            color="white"
            className="shadow-md"
            onClick={() => {
              checkAudioPermission();
              setDisabled(false);
            }}>
            마이크 허용
          </Button>
        </div>
      </div>
    </div>
  );
}
