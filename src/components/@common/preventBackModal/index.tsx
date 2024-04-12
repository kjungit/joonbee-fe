import usePreventBack from '../../../hooks/usePreventBack';
import { VariableIcon } from '../variableIcon';
import { Text } from '../text';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import Button from '../button';

export default function PreventBackModal() {
  const { isOpened, handleClose, handleConfirm } = usePreventBack();
  const { modalRef } = useModalOutsideClick<HTMLDivElement>(handleClose);

  return (
    <>
      {isOpened && (
        <div className="bg-main-primary/20 fixed z-40 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-screen h-screen   shadow-md flex items-center justify-center">
          <div ref={modalRef} className="relative w-[280px]  rounded-xl bg-white shadow-md">
            <div className="w-full p-8">
              <button className="absolute right-4 top-4" onClick={handleClose}>
                <VariableIcon name="close" size={24} isHover className="p-1" />
              </button>
              <Text size="2xl" className="text-blue-secondary w-full mb-5" weight="lg">
                면접을 종료하시겠습니까?
              </Text>
              <Text className="w-full mb-5">
                페이지를 벗어날 경우 지금까지 진행한 면접은 사라집니다!
              </Text>
              <Button className="w-full" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
