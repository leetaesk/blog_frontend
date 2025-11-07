// src/loaders/getPostByIdLoader.ts
import { QueryClient } from '@tanstack/react-query';
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';

import { getPostById } from '@/features/posts/posts.api';
import type { GetPostByIdResultType } from '@/features/posts/posts.dto';

// 기존 훅에서 사용하던 API 호출 함수를 그대로 가져옵니다.

// QueryClient를 인자로 받는 loader 생성 함수
export const getPostByIdLoader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }: LoaderFunctionArgs): Promise<GetPostByIdResultType> => {
    const postId = parseInt(params.postId || '', 10);
    if (isNaN(postId)) {
      throw new Response('Invalid Post ID', { status: 400 });
    }

    // useGetPostById 훅에 있던 queryKey와 queryFn 로직을 여기에 직접 작성합니다.
    const queryKey = ['post', postId];
    const queryFn = () => getPostById({ postId });

    try {
      // 캐시를 확인하고 데이터가 없으면 queryFn을 실행하여 데이터를 가져옵니다.
      return await queryClient.ensureQueryData({ queryKey, queryFn });
    } catch (error) {
      console.error('Failed to fetch post in loader:', error);
      // 에러 발생 시, React Router가 처리할 수 있도록 Response 객체를 던집니다.
      throw new Response('Not Found', { status: 404 });
    }
  };
