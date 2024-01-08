import { Button } from '../../Button';

const ModalCloseButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Button size="xs" color="white" text="xs" onClick={onClick}>
    {children}
  </Button>
);

type ModalCloseButtonComponentType = typeof ModalCloseButton extends (
  props: infer P,
) => React.ReactElement<infer T>
  ? (props: P) => React.ReactElement<T>
  : never;

export const modalCloseButtonComponentType: ModalCloseButtonComponentType = ModalCloseButton as any;

export default ModalCloseButton;
