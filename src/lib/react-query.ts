import { QueryCache, QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';

/**
 * 전역 에러 핸들러
 * meta 옵션에 errorMessage: false가 있으면 토스트를 띄우지 않음
 */
function handleError(error: unknown, meta?: Record<string, unknown>) {
  if (meta?.errorMessage === false) return;

  let message = '알 수 없는 오류가 발생했습니다.';

  // 1. Axios 에러인지 확인 (서버 통신 관련 에러)
  if (isAxiosError(error)) {
    // case A: 서버가 응답을 줬지만, 에러 코드(4xx, 5xx)인 경우
    if (error.response) {
      // 1순위: 서버가 보내준 커스텀 메시지 (response.data.message)
      // 2순위: HTTP 상태 메시지 (예: "Not Found", "Internal Server Error")
      message =
        error.response.data?.message || `${error.response.status} ${error.response.statusText}`;
    }
    // case B: 요청은 보냈는데 응답이 없는 경우 (네트워크 끊김, 타임아웃, CORS)
    else if (error.request) {
      message = '서버와 연결할 수 없습니다. 네트워크를 확인해주세요.';
    }
    // case C: 요청 설정 중에 에러가 난 경우
    else {
      message = error.message;
    }
  }
  // 2. 일반 자바스크립트 에러인 경우 (예: 코드 오타, 로직 에러)
  else if (error instanceof Error) {
    message = error.message;
  }

  // 3. 토스트 띄우기
  toast.error(message);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 개발땐 0이 편한데 배포는 1로 해야 함 근데 걍 1로 쓰자
      retry: 1,
      // 꺼삐자
      refetchOnWindowFocus: false,
      // 이거 켜줘야 ErrorBoundary로 에러 던집니다~
      throwOnError: true,
    },
  },
  // QueryCache: GET 요청 실패 시 전역 핸들링
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 데이터가 이미 있는 상태(refetching)에서 실패한 경우에만 토스트 알림
      // (아예 데이터가 없는 경우는 ErrorBoundary로 넘김)
      if (query.state.data !== undefined) {
        handleError(error, query.meta);
      }
    },
  }),
  // 2. MutationCache: POST, PATCH, DELETE 요청 실패 시 전역 핸들링
  // 훅마다 다른 토스트 띄우고 있어서 일단 잠가
  // mutationCache: new MutationCache({
  //   onError: (error, _variables, _context, mutation) => {
  //     handleError(error, mutation.meta);
  //   },
  // }),
});
