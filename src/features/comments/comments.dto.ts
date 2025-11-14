import type { Author } from '@/features/posts/posts.dto';
import type { CommonResponseDto } from '@/types/CommonResponseDto';

export interface getCommentsRequestDto {
  postId: number;
}

// 백엔드 내 사용 dto
export interface GetCommentsServiceDto {
  postId: number;
  userId?: number;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  author: Author;
}

export type CommentByUser = Comment & {
  isOwner: boolean;
  isLiked: boolean;
  replies: CommentByUser[]; // (수정) replies -> replies
  repliesCount: number; // 답글 깊이는 1로 제한. 1차 답글의 개수 count
};

export interface getCommentsResultType {
  comments: CommentByUser[];
  commentCount: number; // 1차 댓글의 수
}

export type getCommentsResponseDto = CommonResponseDto<getCommentsResultType>;

export interface MyCommentResult {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean; // 내가 내 댓글을 '좋아요' 했는지 여부
  parentCommentId: number | null;

  post: {
    id: number;
    title: string;
    thumbnailUrl: string | null;
  };
}

export interface getCommentsCreatedByMeResultType {
  comments: MyCommentResult[]; // 👈 CommentByUser[] 대신 MyCommentResult[] 사용
  commentCount: number;
}

export type getCommentsCreatedByMeResponseDto = CommonResponseDto<getCommentsCreatedByMeResultType>;

export interface postCommentRequestDto {
  postId: number;
  content: string;
  parentCommentId?: number;
}

export interface postCommentResultType {
  id: number;
  content: string;
  userId: number;
  createddAt: string;
  parentCommentId: string | null;
}

export type postCommentResponseDto = CommonResponseDto<postCommentResultType>;
