import type { CommonResponseDto } from '@/types/CommonResponseDto';

/**
 * getComments 댓글 타입
 */
export type CommentByUser = Comment & {
  isOwner: boolean;
  isLiked: boolean;
  replies: CommentByUser[];
  repliesCount: number; // 1차 답글의 개수 : depth 최대 1
};

export type getCommentsRequestDto = {
  postId: number;
};
export type getCommentsResultType = {
  comments: CommentByUser[];
  commentCount: number; // 1차 댓글의 수
};

export type getCommentsResponseDto = CommonResponseDto<getCommentsResultType>;

/**
 * get 내가 쓴 댓글 타입
 */
export type MyCommentResult = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  isLiked: boolean; // 내가 내 댓글을 '좋아요' 했는지 여부
  parentCommentId: number | null;
  /**
   * 댓글이 달린 post 간략한 정보
   */
  post: {
    id: number;
    title: string;
    thumbnailUrl: string | null;
  };
};

export type getCommentsCreatedByMeResultType = {
  comments: MyCommentResult[];
  commentCount: number;
};

export type getCommentsCreatedByMeResponseDto = CommonResponseDto<getCommentsCreatedByMeResultType>;

// create 댓글
export type postCommentRequestDto = {
  postId: number;
  content: string;
  parentCommentId?: number;
};

export type postCommentResultType = {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  parentCommentId: number | null;
};

export type postCommentResponseDto = CommonResponseDto<postCommentResultType>;

// patch 댓글
export type patchCommentRequestDto = {
  commentId: number;
  content: string;
};

export type patchCommentResultType = {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  parentCommentId: number | null;
};

export type patchCommentResponseDto = CommonResponseDto<patchCommentResultType>;

// Delete 댓글
export type DeleteCommentRequestDto = {
  commentId: number;
};

export type deleteCommentResultType = {
  id: number;
};

export type deleteCommentResponseDto = CommonResponseDto<deleteCommentResultType>;
