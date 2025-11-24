import { useState } from 'react';

import ProfileImage from '@/components/ProfileImage';
import type { postCommentRequestDto } from '@/features/comments/comments.dto';
import { usePostComment } from '@/features/comments/comments.hook';
import useUserStore from '@/store/useUserStore';

interface CommentFormProps {
  postId: number;
  parentCommentId?: number | null;
  onSuccess?: () => void;
}

const CommentForm = ({ postId, parentCommentId = null, onSuccess }: CommentFormProps) => {
  // 1. 폼 내부 상태 (댓글 내용)
  const [content, setContent] = useState('');

  // 2. usePostComment 훅 연결
  const { mutate: postComment, isPending } = usePostComment();

  // 3. 동적 placeholder와 버튼 텍스트 설정
  const isReply = parentCommentId !== null;
  const placeholder = isReply ? '답글을 입력하세요...' : '댓글을 입력하세요...';
  const buttonText = isReply ? '답글 등록' : '댓글 등록';

  const profileImageUrl = useUserStore((s) => s.userInfo?.profileImageUrl);
  /**
   * 폼 제출(등록 버튼 클릭) 시 실행되는 핸들러
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 제출(새로고침) 방지

    if (content.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    if (isPending) return; // 이미 제출 중이면 중복 클릭 방지

    // 4. API DTO에 맞게 데이터 조립
    const newComment: postCommentRequestDto = {
      postId,
      content,
      parentCommentId: parentCommentId || undefined, // null -> undefined
    };

    // 5. usePostComment 훅을 실행 (API 호출)
    postComment(newComment, {
      onSuccess: () => {
        setContent(''); // 폼 클리어
        if (onSuccess) {
          onSuccess(); // 부모에게 성공 콜백 전달 (예: 폼 닫기)
        }
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
          className="w-full flex-1 rounded-lg border border-gray-300 p-3 shadow-sm transition-shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          disabled={isPending} // 로딩 중일 때 입력 방지
          aria-label={placeholder}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          className="focus:ring-opacity-75 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={isPending} // 로딩 중일 때 클릭 방지
        >
          {isPending ? '등록 중...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
