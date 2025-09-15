export type commonResponseDto<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};
