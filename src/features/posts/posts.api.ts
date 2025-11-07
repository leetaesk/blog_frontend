import type {
  DeletePostRequestDto,
  DeletePostResponseDto,
  DeletePostResultType,
  GetPostByIdRequestDto,
  GetPostByIdResponseDto,
  GetPostByIdResultType,
  GetPostForEditRequestDto,
  GetPostForEditResponseDto,
  GetPostForEditResultType,
  PostPostRequestDto,
  PostPostResponseDto,
  PostPostResultType,
  UpdatePostRequestDto,
  UpdatePostResponseDto,
  UpdatePostResultType,
} from '@/features/posts/posts.dto';
import { axiosPrivateInstance } from '@/lib/axiosInstance';

export const getPostById = async (
  params: GetPostByIdRequestDto,
): Promise<GetPostByIdResultType> => {
  const response = await axiosPrivateInstance.get<GetPostByIdResponseDto>(
    `/api/posts/${params.postId}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

/**
 * 게시글을 수정하는 API 함수
 * @param params - postId와 수정할 데이터를 포함합니다.
 */
export const patchPostById = async (
  params: UpdatePostRequestDto,
): Promise<UpdatePostResultType> => {
  // 1. DTO에서 postId와 실제 업데이트할 데이터를 분리합니다.
  const { postId, ...updateData } = params;

  // 2. patch 메서드를 사용해 요청을 보냅니다. 두 번째 인자는 요청 본문(body)입니다.
  const response = await axiosPrivateInstance.patch<UpdatePostResponseDto>(
    `/api/posts/${postId}`,
    updateData,
  );

  // 3. 응답이 실패했을 경우 에러를 던집니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 4. 성공 시 결과 데이터를 반환합니다.
  return response.data.result;
};

/**
 * 게시글을 삭제하는 API 함수
 * @param params - 삭제할 게시글의 postId를 포함합니다.
 */
export const deletePostById = async (
  params: DeletePostRequestDto,
): Promise<DeletePostResultType> => {
  // 1. delete 메서드를 사용해 요청을 보냅니다.
  const response = await axiosPrivateInstance.delete<DeletePostResponseDto>(
    `/api/posts/${params.postId}`,
  );

  // 2. 응답이 실패했을 경우 에러를 던집니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 3. 성공 시 결과 데이터를 반환합니다.
  return response.data.result;
};

export const getPostForEdit = async (
  params: GetPostForEditRequestDto,
): Promise<GetPostForEditResultType> => {
  const response = await axiosPrivateInstance.get<GetPostForEditResponseDto>(
    `/api/posts/edit-data/${params.postId}`,
  );

  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  return response.data.result;
};

export const postPost = async (params: PostPostRequestDto): Promise<PostPostResultType> => {
  const response = await axiosPrivateInstance.post<PostPostResponseDto>('api/posts', params);

  // 가드 클로저: isSuccess가 false이면 에러를 던지고 함수를 즉시 종료합니다.
  if (!response.data.isSuccess) {
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }

  // 위 if문을 통과했다면 무조건 성공한 케이스이므로, 바로 데이터를 반환합니다.
  return response.data.result;
};
