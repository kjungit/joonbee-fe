type ItemProps = {
  size: 'sm' | 'md';
  children: React.ReactNode;
};

const Item = ({ children, size = 'sm' }: ItemProps) => {
  const baseStyles = `bg-gray-primary rounded-[8px] font-bold text-center`;
  const sizeStyles = {
    sm: 'text-[16px] w-[116px] h-[44px]',
    md: 'text-[20px] w-[160px] h-[60px]',
  };

  const ItemStyles = `${baseStyles} ${sizeStyles[size]}`;

  return (
    <option value={children as string} className={ItemStyles}>
      {children}
    </option>
  );
};

export default Item;
