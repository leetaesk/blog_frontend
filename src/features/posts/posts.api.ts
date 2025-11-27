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

/**
 * get Post 하나
 * @returns result
 */
export const getPostById = async (
  params: GetPostByIdRequestDto,
): Promise<GetPostByIdResultType> => {
  const response = await axiosPrivateInstance.get<GetPostByIdResponseDto>(
    `/api/posts/${params.postId}`,
  );

  return response.data.result;
};

/**
 * 게시글 작성
 * @returns result
 */
export const postPost = async (params: PostPostRequestDto): Promise<PostPostResultType> => {
  const response = await axiosPrivateInstance.post<PostPostResponseDto>('api/posts', params);

  return response.data.result;
};

/**
 * 게시글 수정 API 함수
 * @returns result
 */
export const patchPostById = async (
  params: UpdatePostRequestDto,
): Promise<UpdatePostResultType> => {
  // updateData는 postPost Dto와 동일
  const { postId, ...updateData } = params;

  const response = await axiosPrivateInstance.patch<UpdatePostResponseDto>(
    `/api/posts/${postId}`,
    updateData,
  );

  return response.data.result;
};

/**
 * 게시글 삭제 api
 * @returns result
 */
export const deletePostById = async (
  params: DeletePostRequestDto,
): Promise<DeletePostResultType> => {
  const response = await axiosPrivateInstance.delete<DeletePostResponseDto>(
    `/api/posts/${params.postId}`,
  );

  return response.data.result;
};

/**
 * 게시글 수정 전용 get요청. postPost Dto에 맞춤
 * @returns result
 */
export const getPostForEdit = async (
  params: GetPostForEditRequestDto,
): Promise<GetPostForEditResultType> => {
  const response = await axiosPrivateInstance.get<GetPostForEditResponseDto>(
    `/api/posts/edit-data/${params.postId}`,
  );

  return response.data.result;
};
