// ===== ✨ 게시글 상세 조회 API DTO 추가 ===== //
import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface PostData {
  title: string;
  content: string;
  categoryId: number;
  summary: string;
  thumbnailUrl: string;
  tags?: string[];
}

// 카테고리 타입
interface Category {
  id: number;
  name: string;
}

// 작성자 정보 타입
interface Author {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

// 태그 정보 타입
interface Tag {
  id: number;
  name: string;
}

/**
 * GET /api/posts/:postId - 응답의 `result` 필드 DTO
 * @description 게시글 상세 조회 API 응답의 실제 데이터 부분을 정의합니다.
 */

export interface GetPostByIdRequestDto {
  postId: number;
}
export interface GetPostByIdResultType {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string | null;
  views: number;
  createdAt: string; // 'YYYY-MM-DD HH:MI:SS' 형식
  updatedAt: string; // 'YYYY-MM-DD HH:MI:SS' 형식
  author: Author;
  category: Category | null; // 카테고리가 없을 수 있음
  tags: Tag[]; // 태그는 여러 개일 수 있고, 없을 수도 있음
  commentCount: number;
}

/**
 * GET /api/posts/:postId - 최종 응답 DTO
 * @description 게시글 상세 조회 API의 최종 응답 형태를 정의합니다.
 */
export type GetPostByIdResponseDto = CommonResponseDto<GetPostByIdResultType>;

export type UpdatePostRequestDto = Partial<PostData> & {
  postId: number;
};

export interface UpdatePostResultType {
  postId: number;
}
export type UpdatePostResponseDto = CommonResponseDto<UpdatePostResultType>;

export interface DeletePostRequestDto {
  postId: number;
}

export interface DeletePostResultType {
  postId: number;
}
export type DeletePostResponseDto = CommonResponseDto<DeletePostResultType>;

// 수정용 get
export interface GetPostForEditRequestDto {
  postId: number;
}

export interface GetPostForEditResultType {
  title: string;
  content: string; // ❗️ 원본 Markdown
  summary: string | null;
  thumbnailUrl: string | null;
  categoryId: number | null;
  tags: string[]; // ❗️ Tag 이름을 string 배열로
}
export type GetPostForEditResponseDto = CommonResponseDto<GetPostForEditResultType>;
