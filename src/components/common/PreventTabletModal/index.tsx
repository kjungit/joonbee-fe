// PreventBackModal.js
import AlertModal from '@/components/ui/Modal/AlertModal';
import usePreventTablet from '@/hooks/usePreventTablet';

export default function PreventTabletModal() {
  const { isOpened, handleClose } = usePreventTablet();

  return (
    <>
      {isOpened && (
        <AlertModal
          isOpened={isOpened}
          onClose={handleClose}
          title="알림"
          body={`모바일 환경에서는 사용할 수 없습니다.
          데스크톱 환경에서 사용해주세요!`}
        />
      )}
    </>
  );
}
