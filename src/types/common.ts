export interface ApiResponseType<T> {
  code: number;
  message: string;
  data: T;
  totalPage: number;
  totalCount: number;
  path: string;
}
