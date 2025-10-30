import type {
  PostPostRequestDto,
  PostPostResponseDto,
  PostPostResultType,
} from '@/features/Post/types/postPostType';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const postPost = async (params: PostPostRequestDto): Promise<PostPostResultType> => {
  const response = await axiosPrivateInstance.post<PostPostResponseDto>('api/posts', params);

  // 가드 클로저: isSuccess가 false이면 에러를 던지고 함수를 즉시 종료합니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 위 if문을 통과했다면 무조건 성공한 케이스이므로, 바로 데이터를 반환합니다.
  return response.data.result;
};
