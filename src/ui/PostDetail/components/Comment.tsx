import { memo, useCallback, useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import type { CommentByUser } from '@/features/comments/comments.dto';
import CommentDeleteButton from '@/ui/PostDetail/components/CommentDeleteButton';
import CommentEditForm from '@/ui/PostDetail/components/CommentEditForm';
import CommentForm from '@/ui/PostDetail/components/CommentForm';
import CommentLikeButton from '@/ui/PostDetail/components/CommentLikeButton';
import { formatDate } from '@/utils/formatDate';

interface CommentProps {
  postId: number;
  comment: CommentByUser;
  isReply?: boolean;
}

/**
 * 댓글 컴포넌트 - 재귀로 답글 구현
 * 무한댓글도 가능하나 api에 맞춰 1차 깊이로 구현
 * 부모 commentId 가 있을 경우 답글폼 렌더링하지 않음
 */
export const Comment = memo(({ postId, comment, isReply = false }: CommentProps) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    id: commentId,
    author,
    content,
    createdAt,
    likesCount,
    repliesCount,
    replies,
    isLiked,
    isOwner,
  } = comment;

  // 2. 함수 재생성 방지를 위해 useCallback 사용
  const handleToggleRepliesAndForm = useCallback(() => {
    // 이전 상태(prev)를 기반으로 반전시키는 것이 더 안전합니다.
    setShowReplies((prev) => !prev);
  }, []);

  const handleToggleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  // 댓글 작성 성공 시: 답글 목록을 열어둔 상태로 유지
  const onSuccessCreateComment = useCallback(() => {
    setShowReplies(true);
  }, []);

  // 수정 취소/성공 핸들러
  const handleEditClose = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <div className="flex space-x-3 border-b border-gray-100 py-4 last:border-b-0">
      {/* 프로필 이미지 */}
      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <ProfileImage src={author.profileImageUrl} alt={`${author.nickname} 프로필`} />
      </div>

      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex items-center justify-between space-x-2">
            {/* 닉네임 및 날짜 */}
            <div className="flex flex-wrap items-end gap-2">
              <span className="text-sm font-semibold">{author.nickname}</span>
              <span className="hidden text-xs sm:inline">
                {formatDate({ dateString: createdAt })}
              </span>
              <span className="text-xs sm:hidden">
                {formatDate({ dateString: createdAt, onlyDay: true })}
              </span>
            </div>

            {/* 본인 댓글일 경우 수정/삭제 버튼 */}
            {isOwner && (
              <div className="flex h-full justify-between sm:gap-2">
                <button
                  type="button"
                  onClick={handleToggleEdit}
                  className="rounded-md bg-transparent py-1 text-sm font-medium whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent sm:px-3"
                  aria-label="댓글수정"
                >
                  수정
                </button>
                {/* DeleteButton은 내부 로직이 복잡하지 않다면 그대로 둡니다 */}
                <CommentDeleteButton commentId={commentId} />
              </div>
            )}
          </div>
        </div>

        {/* 내용 또는 수정 폼 */}
        {isEditing ? (
          <CommentEditForm
            commentId={commentId}
            originalContent={content}
            onSuccess={handleEditClose}
            onCancel={handleEditClose}
          />
        ) : (
          <p className="mt-1 mb-2 text-sm whitespace-pre-wrap">{content}</p>
        )}

        {/* 하단 액션 버튼 */}
        <div className="flex items-center space-x-4 text-xs">
          {/* LikeButton도 props가 같다면 리렌더링 되지 않도록 내부에서 memo 되어 있으면 좋습니다 */}
          <CommentLikeButton
            commentId={commentId}
            initialLikesCount={likesCount}
            initialIsLiked={isLiked}
          />

          {/* 답글 달기/보기 버튼 통합 로직 */}
          {!isReply && (
            <button
              type="button"
              className="cursor-pointer transition-colors"
              onClick={handleToggleRepliesAndForm}
            >
              {/* showReplies를 먼저 달아야 답글 작성 시 바로 보임 */}
              {showReplies
                ? '답글 숨기기'
                : repliesCount === 0
                  ? '답글 달기'
                  : `답글 ${repliesCount}개`}
            </button>
          )}
        </div>

        {/* 답글 목록 (재귀 렌더링) */}
        {showReplies && replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {replies.map((reply) => (
              <Comment key={reply.id} postId={postId} comment={reply} isReply={true} />
            ))}
          </div>
        )}

        {/* 답글 작성 폼 */}
        {showReplies && !isReply && (
          <CommentForm
            key={`reply-form-${commentId}`}
            postId={postId}
            parentCommentId={commentId}
            onSuccess={onSuccessCreateComment}
          />
        )}
      </div>
    </div>
  );
});

// React DevTools에서 컴포넌트 이름을 식별하기 위해 설정
Comment.displayName = 'Comment';

export default Comment;
