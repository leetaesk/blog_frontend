import type {
  CreateDraftResponseDto,
  CreateDraftResultType,
  DeletePostRequestDto,
  DeletePostResponseDto,
  DeletePostResultType,
  DraftPayload,
  GetDraftsResponseDto,
  GetDraftsResultType,
  GetPostByIdRequestDto,
  GetPostByIdResponseDto,
  GetPostByIdResultType,
  GetPostForEditRequestDto,
  GetPostForEditResponseDto,
  GetPostForEditResultType,
  PostPostRequestDto,
  PostPostResponseDto,
  PostPostResultType,
  UpdateDraftResponseDto,
  UpdateDraftResultType,
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

/**
 * 내 임시글 목록 조회 - GET /api/posts/drafts
 * 임시글이 없거나(404) 백엔드 미구현이면 빈 배열로 처리해 화면이 깨지지 않게 함.
 * @returns 임시글 목록
 */
export const getDrafts = async (): Promise<GetDraftsResultType> => {
  try {
    const response = await axiosPrivateInstance.get<GetDraftsResponseDto>('/api/posts/drafts');
    return response.data.result;
  } catch (error) {
    if ((error as { status?: number })?.status === 404) return [];
    throw error;
  }
};

/**
 * 새 임시글 생성 - POST /api/posts/drafts
 * @returns { id, updatedAt }
 */
export const createDraft = async (payload: DraftPayload): Promise<CreateDraftResultType> => {
  const response = await axiosPrivateInstance.post<CreateDraftResponseDto>(
    '/api/posts/drafts',
    payload,
  );

  return response.data.result;
};

/**
 * 기존 임시글 수정 - PUT /api/posts/drafts/:draftId
 * @returns { updatedAt }
 */
export const updateDraft = async (params: {
  draftId: number;
  payload: DraftPayload;
}): Promise<UpdateDraftResultType> => {
  const response = await axiosPrivateInstance.put<UpdateDraftResponseDto>(
    `/api/posts/drafts/${params.draftId}`,
    params.payload,
  );

  return response.data.result;
};

/**
 * 임시글 삭제 - DELETE /api/posts/drafts/:draftId
 */
export const deleteDraft = async (draftId: number): Promise<void> => {
  await axiosPrivateInstance.delete(`/api/posts/drafts/${draftId}`);
};
