// PreventBackModal.js
import AlertModal from '../../ui/Modal/AlertModal';
import usePreventBack from '../../../hooks/usePreventBack';

export default function PreventBackModal() {
  const { isOpened, handleClose, handleConfirm } = usePreventBack();

  return (
    <>
      {isOpened && (
        <AlertModal
          isOpened={isOpened}
          onClose={handleClose}
          title="면접을 종료하시겠습니까?"
          body={`페이지를 벗어날 경우
          지금까지 진행한 면접은 사라집니다!`}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
