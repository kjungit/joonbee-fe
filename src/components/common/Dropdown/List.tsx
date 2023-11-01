import { selectedValueState } from '../../../recoil/select/atom';
import { useRecoilState } from 'recoil';

type ListProps = {
  children: React.ReactNode;
  name: 'category' | 'subcategory';
  size: 'sm' | 'md';
};

const List = ({ children, name, size = 'sm' }: ListProps) => {
  const baseStyles = `bg-main-primary text-white rounded-[8px] font-bold text-center hover:bg-hover-primary mr-[20px] shadow-sm`;
  const sizeStyles = {
    sm: 'text-[16px] w-[116px] h-[44px]',
    md: 'text-[20px] w-[160px] h-[60px]',
  };

  const ListStyles = `${baseStyles} ${sizeStyles[size]}`;

  const [selectedValue, setSelectedValue] = useRecoilState(selectedValueState);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    name === 'category'
      ? setSelectedValue(prev => ({ ...prev, selectedCategory: e.target.value }))
      : setSelectedValue(prev => ({ ...prev, selectedSubcategory: e.target.value }));
  };

  return (
    <label>
      <select name={name} defaultValue="카테고리" onChange={onChangeSelect} className={ListStyles}>
        {children}
      </select>
    </label>
  );
};

export default List;
