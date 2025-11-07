import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useToggleLike } from '@/features/likes/likes.hook';
import useUserStore from '@/store/useUserStore';

interface LikeButtonProps {
  postId: number;
  initialLikesCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({ postId, initialLikesCount, initialIsLiked }: LikeButtonProps) => {
  const isLoggedIn = useUserStore((s) => s.userId) !== null;
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const navigate = useNavigate();
  const { mutate, isPending } = useToggleLike();

  const handleLikeClick = () => {
    // 1. 로그인 상태 확인 (Guard 1)
    if (!isLoggedIn) {
      // 2. 로그인 유도 (Guard 2)
      // 사용자가 '취소'를 누르면 confirm이 false를 반환 -> 이 조건문이 true가 되어 return!
      if (!window.confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
        return; // 함수 실행 중단
      }

      // '확인'을 누른 경우, 로그인 페이지로 이동시키고 함수 종료
      navigate(ROUTES.LOGIN);
      return;
    }

    if (isPending) return; // API 요청 중에는 중복 클릭 방지

    // 서버 응답을 기다리지 않고 UI를 즉시 변경하여 사용자 경험을 향상시킵니다.
    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likesCount + 1 : likesCount - 1;
    setIsLiked(newIsLiked);
    setLikesCount(newCount);
    if (newIsLiked) {
      setIsAnimating(true);
    }
    // --- Optimistic Update 끝 ---

    // 3. 서버에 '좋아요' 토글 요청
    mutate(
      { postId },
      {
        onSuccess: (data) => {
          // 4. (Optimistic Update 사용 시) 서버 응답값으로 다시 한번 동기화
          setIsLiked(data.result.liked);
          setLikesCount(data.result.newLikesCount);
        },
        onError: () => {
          setIsLiked(!newIsLiked);
          setLikesCount(newIsLiked ? newCount - 1 : newCount + 1);
        },
      },
    );
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
        disabled={isPending}
        className="group relative transform transition-transform duration-100 ease-out active:scale-90"
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
      >
        <svg
          className={`h-7 w-7 transition-all ${isAnimating ? 'animate-bounce-in' : ''} ${
            isLiked
              ? 'text-red-500' // '좋아요' 상태일 때
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' // 아닐 때
          }`}
          fill={isLiked ? 'currentColor' : 'none'} // '좋아요' 상태에 따라 내부 채움
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onAnimationEnd={handleAnimationEnd} // 애니메이션 종료 시 호출
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

export default LikeButton;
