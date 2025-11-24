import type { Author } from '@/features/posts/posts.dto';
import type { CommonResponseDto } from '@/types/CommoasdfnResponseDto';

export interface getCommentsRequestDto {
  postId: number;
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
  createdAt: string;
  parentCommentId: number | null;
}

export type postCommentResponseDto = CommonResponseDto<postCommentResultType>;

export interface patchCommentRequestDto {
  commentId: number;
  content: string;
}

export interface patchCommentResultType {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  parentCommentId: number | null;
}

export type patchCommentResponseDto = CommonResponseDto<patchCommentResultType>;

// (추가) Delete 서비스 레이어로 전달되는 DTO
export interface DeleteCommentRequestDto {
  commentId: number;
}

export interface deleteCommentResultType {
  id: number;
}

export type deleteCommentResponseDto = CommonResponseDto<deleteCommentResultType>;
