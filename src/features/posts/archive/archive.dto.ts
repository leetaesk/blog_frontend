import type { CommonResponseDto } from '@/types/CommonResponseDto';

/**
 * GET /api/posts - 요청 DTO (Query Parameters)
 * @description 게시글 목록 조회 API의 요청 쿼리를 정의합니다.
 * @property {number} page - 조회할 페이지 번호 (기본값: 1)
 * @property {number} limit - 한 페이지에 보여줄 게시글 수 (기본값: 서버에서 설정한 값, 예: 8)
 * @property {string} category - 필터링할 카테고리 이름 (선택 사항)
 */
export interface GetPostsRequestDto {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

// 개별 카테고리 정보 타입
interface Category {
  id: number;
  name: string;
}

// 개별 게시글 정보 타입
export interface PostListItem {
  id: number;
  title: string;
  summary: string;
  createdAt: string; // "YYYY-MM-DD" 형식의 문자열
  thumbnailUrl: string | null;
  commentCount: number;
  category: Category;
  likesCount: number;
}

// 페이지네이션 정보 타입
interface Pagination {
  totalPostCount: number;
  totalPage: number;
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export type GetPostsResultType = {
  posts: PostListItem[];
  pagination: Pagination;
};

export type GetPostsResponseDto = CommonResponseDto<GetPostsResultType>;

//좋아요 한 글
export interface GetPostsLikedByMeRequestDto {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export type GetPostsLikedByMeResultType = {
  posts: PostListItem[];
  pagination: Pagination;
};

export type GetPostsLikedByMeResponseDto = CommonResponseDto<GetPostsLikedByMeResultType>;
