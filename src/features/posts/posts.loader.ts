import { QueryClient } from '@tanstack/react-query';
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

import { QUERY_KEY } from '@/constants/queryKey';
import { getPostById } from '@/features/posts/posts.api';
import type { GetPostByIdResultType } from '@/features/posts/posts.dto';
import type { CommonErrorDto } from '@/types/CommonResponseDto';

// QueryClient를 인자로 받는 loader 생성 함수
export const getPostByIdLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }: LoaderFunctionArgs): Promise<GetPostByIdResultType> => {
    const postId = parseInt(params.postId || '', 10);

    if (isNaN(postId)) {
      throw new Response('Invalid Post ID', { status: 400 });
    }

    try {
      // 캐시를 확인하고 데이터가 없으면 queryFn을 실행하여 데이터를 가져옵니다.
      return await queryClient.ensureQueryData({
        queryKey: QUERY_KEY.posts.BY_POST_ID(postId),
        queryFn: () => getPostById({ postId }),
      });
    } catch (err) {
      // 여기 로더에서 에러 던지면 React Router의 ErrorElement 실행 **
      // 다른 컴포넌트에서 useRouteError() 로 에러메시지 가져올 수 있음
      const error = err as CommonErrorDto;
      // 에러 분기 처리
      // AxiosError이고 status가 404인 경우에만 'Not Found' 처리
      if (error.status === 404) {
        throw new Response('게시글을 찾을 수 없습니다.', { status: 404 });
      }

      throw error;
    }
  };
