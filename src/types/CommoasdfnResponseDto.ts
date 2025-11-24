export type CommonResponseDto<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};
