export interface UserInfoProps {
  id: string;
  interviewCount: string;
  email: string | undefined;
  nickName: string;
  thumbnail: string;
  questionCount: string;
  categoryInfo: CategoryInfoProps[];
}

export interface CategoryInfoProps {
  categoryCount: number;
  categoryName: string;
}
