import { Button } from '../../Button';

const ModalConfirmButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Button size="auto" color="bluePrimary" text="xs" onClick={onClick}>
    {children}
  </Button>
);

type ModalConfirmButtonComponentType = typeof ModalConfirmButton extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalConfirmButtonComponentType: ModalConfirmButtonComponentType =
  ModalConfirmButton as any;

export default ModalConfirmButton;
