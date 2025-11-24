import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useToggleCommentLike } from '@/features/likes/likes.hook';
import { useDebounce } from '@/hooks/useDebounce';
import useUserStore from '@/store/useUserStore';

interface CommentLikeButtonProps {
  commentId: number;
  initialLikesCount: number;
  initialIsLiked: boolean;
}

const CommentLikeButton = ({
  commentId,
  initialLikesCount,
  initialIsLiked,
}: CommentLikeButtonProps) => {
  const isLoggedIn = useUserStore((s) => s.userId) !== null;
  const navigate = useNavigate();
  const { mutate } = useToggleCommentLike();

  // [State] UI 표시용
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // [Ref] 서버와 동기화된 마지막 상태 (API 요청 최적화용)
  // 좋아요를 '켰다 껐다' 반복해서 결국 제자리라면 요청을 안 보내기 위함
  const lastServerLiked = useRef<boolean>(initialIsLiked);

  // [Debounce] 실제 API 요청을 수행하는 함수
  // 300ms 동안 추가 클릭이 없으면 실행됨
  const debouncedMutate = useDebounce((currentIsLiked: boolean) => {
    // 현재 UI 상태가 서버의 마지막 상태와 다를 때만 요청 전송
    if (currentIsLiked !== lastServerLiked.current) {
      mutate(
        { commentId },
        {
          onSuccess: (data) => {
            // 서버 응답으로 확실하게 동기화 및 기준값(Ref) 업데이트
            const serverLiked = data.result.liked;
            setIsLiked(serverLiked);
            setLikesCount(data.result.newLikesCount);
            lastServerLiked.current = serverLiked;
          },
          onError: () => {
            // 에러 발생 시 롤백
            setIsLiked(!currentIsLiked);
            setLikesCount(currentIsLiked ? likesCount - 1 : likesCount + 1);
          },
        },
      );
    }
  }, 300); // 300ms 디바운스

  const handleLikeClick = () => {
    // 1. 로그인 가드
    if (!isLoggedIn) {
      if (!window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
        return;
      }
      navigate(ROUTES.LOGIN);
      return;
    }

    // 2. Optimistic Update (즉시 UI 반영)
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(nextIsLiked);
    setLikesCount(nextCount);

    if (nextIsLiked) {
      setIsAnimating(true);
    }

    // 3. 디바운스 함수 호출 (최종 상태 전달)
    debouncedMutate(nextIsLiked);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="flex items-center gap-3">
      <style>
        {`
            @keyframes bounce-in {
                0% { transform: scale(0.9); }
                50% { transform: scale(1.25); }
                100% { transform: scale(1); }
            }
            .animate-bounce-in {
                animation: bounce-in 0.3s ease-out;
            }
        `}
      </style>

      {/* 하트 버튼 */}
      <button
        onClick={handleLikeClick}
        // disabled={isPending} // 디바운싱 중 연타를 허용하기 위해 제거
        className="group relative transform transition-transform duration-100 ease-out active:scale-90"
        aria-label={isLiked ? 'Unlike comment' : 'Like comment'}
      >
        <svg
          className={`h-7 w-7 transition-all ${isAnimating ? 'animate-bounce-in' : ''} ${
            isLiked
              ? 'text-red-500'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
          fill={isLiked ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onAnimationEnd={handleAnimationEnd}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
      </button>

      {/* 좋아요 개수 */}
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {likesCount} likes
      </span>
    </div>
  );
};

export default CommentLikeButton;
