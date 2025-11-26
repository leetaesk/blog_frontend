export type CommonResponseDto<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type CommonErrorDto = {
  isSuccess: boolean;
  code: number | string; // 백엔드에서 주는 비즈니스 코드 (ex: "USER_NOT_FOUND")
  message: string;
  status?: number; //Axios 인터셉터가 넣어준 HTTP 상태 코드 (ex: 404)
};
