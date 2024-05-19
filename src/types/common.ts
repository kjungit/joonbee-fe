import { CategoryName, SubcategoryName } from '@/types';

export interface ApiResponseType<T> {
  code: number;
  message: string;
  data: T;
}
export interface ToggleItemProps {
  id: CategoryName;
  value: string;
  isOpen: boolean;
  children: ChildrenProps[];
}

export interface ChildrenProps {
  id: SubcategoryName;
  value: string;
}

export interface ToggleProps {
  item: ToggleItemProps;
  onClickOpen: (clickedItem: ToggleItemProps) => void;
  className?: string;
}

export interface ToggleInterviewProps {
  id: CategoryName;
  value: string;
}
