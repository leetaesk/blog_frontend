import { useState } from 'react';

import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import ProfileImage from '@/components/ProfileImage';
import { ROUTES } from '@/constants/routes';
import type { postCommentRequestDto } from '@/features/comments/comments.dto';
import { usePostComment } from '@/features/comments/comments.hook';
import useUserStore from '@/store/useUserStore';

interface CommentFormProps {
  postId: number;
  parentCommentId?: number | null;
  onSuccess?: () => void;
}

const CommentForm = ({ postId, parentCommentId = null, onSuccess }: CommentFormProps) => {
  const navigate = useNavigate();
  const isLoggedIn = useUserStore((s) => s.accessToken) !== null;

  const [content, setContent] = useState('');
  const { mutate: postComment, isPending } = usePostComment();
  const profileImageUrl = useUserStore((s) => s.userInfo?.profileImageUrl);

  const isReply = parentCommentId !== null;

  const placeholder = !isLoggedIn
    ? '로그인 후 댓글을 작성해보세요.'
    : isReply
      ? '답글을 입력하세요...'
      : '댓글을 입력하세요...';

  const buttonText = isReply ? '답글 등록' : '댓글 등록';

  // 버튼에 공통으로 들어가는 긴 스타일을 변수로 분리 (clsx 활용 시 유용)
  const buttonBaseClass = clsx(
    'rounded-lg px-5 py-2 font-semibold text-white shadow-md transition-colors',
    'bg-blue-600 hover:bg-blue-700',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75',
    'disabled:cursor-not-allowed disabled:bg-gray-400',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    if (isPending) return;

    const newComment: postCommentRequestDto = {
      postId,
      content,
      parentCommentId: parentCommentId || undefined,
    };

    postComment(newComment, {
      onSuccess: () => {
        setContent('');
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 w-full">
      <div className="flex gap-2 pl-2">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <ProfileImage src={profileImageUrl || null} alt={'프로필사진'} />
        </div>

        <textarea
          className={clsx(
            'w-full flex-1 rounded-lg border border-gray-300 p-3 shadow-sm transition-shadow',
            // 필요하다면 포커스 시 스타일 등을 여기에 추가
          )}
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          disabled={isPending || !isLoggedIn}
          aria-label={placeholder}
        />
      </div>

      <div className="mt-2 flex justify-end">
        {/* 등록 버튼 (type="submit" 기본값) */}
        <button
          type="submit"
          className={clsx(buttonBaseClass, {
            hidden: !isLoggedIn, // 비로그인 시 숨김
          })}
          disabled={isPending}
        >
          {isPending ? '등록 중...' : buttonText}
        </button>

        {/* 로그인 버튼: type="button"을 반드시 명시해야 폼 제출을 막음 */}
        <button
          type="button"
          onClick={() => navigate(ROUTES.LOGIN)}
          className={clsx(buttonBaseClass, {
            hidden: isLoggedIn, // 로그인 상태면 숨김
          })}
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
