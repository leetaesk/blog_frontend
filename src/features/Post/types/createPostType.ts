// ================= POST /api/posts ================= //
import type { CommonResponseDto } from '@/types/CommonResponseDto';

/**
 * 게시글 생성을 요청할 때 Body에 담기는 데이터 타입
 * @property {string} title - 게시글 제목
 * @property {string} content - 게시글 내용 (Markdown 원본)
 * @property {string} [summary] - 요약 (선택)
 * @property {string} [thumbnailUrl] - 썸네일 이미지 URL (선택)
 * @property {number | null} [categoryId] - 카테고리 ID (선택)
 * @property {string[]} [tags] - 태그 이름 배열 (선택)
 */
export interface CreatePostRequestDto {
  title: string;
  content: string;
  summary?: string;
  thumbnailUrl?: string;
  categoryId?: number | null;
  tags?: string[];
}

/**
 * 게시글 생성 API의 성공 결과 데이터 타입
 * @property {number} id - 생성된 게시글 ID
 * @property {string} title - 생성된 게시글 제목
 * @property {string} createdAt - 생성 시각 (ISO 8601 형식)
 * @property {object} author - 작성자 정보
 * @property {object | null} category - 카테고리 정보
 * @property {object[]} tags - 태그 정보 배열
 */
export type CreatePostResultType = {
  id: number;
  title: string;
  createdAt: string;
  author: {
    id: number;
    nickname: string;
  };
  category: {
    id: number;
    name: string;
  } | null;
  tags: {
    id: number;
    name: string;
  }[];
};

/**
 * 게시글 생성 API의 최종 응답 타입
 */
export type CreatePostResponseDto = CommonResponseDto<CreatePostResultType>;

// ... (기존의 다른 DTO들)
