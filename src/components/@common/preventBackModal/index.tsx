import usePreventBack from '../../../hooks/usePreventBack';
import { VariableIcon } from '../variableIcon';
import { Text } from '../text';
import useModalOutsideClick from '@/hooks/useModalOutsideClick';
import Button from '../button';
import AlertModal from '../alertModal';

export default function PreventBackModal() {
  const { isOpened, handleClose, handleConfirm } = usePreventBack();
  const { modalRef } = useModalOutsideClick<HTMLDivElement>(handleClose);

  return (
      <AlertModal
        isOpened={isOpened}
        onClose={handleClose}
        onConfirm={handleConfirm}
        text="페이지를 벗어날 경우 지금까지 진행한 면접은 사라집니다!"
        />
  )
}
