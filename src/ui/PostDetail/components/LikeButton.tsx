import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { confirm } from '@/components/ConfirmToast';
import { ROUTES } from '@/constants/routes';
import { useTogglePostLike } from '@/features/likes/likes.hook';
import { useDebounce } from '@/hooks/useDebounce';
import useUserStore from '@/store/useUserStore';

interface LikeButtonProps {
  postId: number;
  initialLikesCount: number;
  initialIsLiked: boolean;
}

const LikeButton = ({ postId, initialLikesCount, initialIsLiked }: LikeButtonProps) => {
  const isLoggedIn = useUserStore((s) => s.userId) !== null;
  const navigate = useNavigate();
  const { mutate } = useTogglePostLike();

  // [State]
  const [likesCount, setLikesCount] = useState<number>(initialLikesCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // [Ref] 서버 상태 추적용
  const lastServerLiked = useRef<boolean>(initialIsLiked);

  // [Debounce]
  const debouncedMutate = useDebounce((currentIsLiked: boolean) => {
    // 변경사항이 있을 때만 요청
    if (currentIsLiked !== lastServerLiked.current) {
      mutate(
        { postId },
        {
          onSuccess: (data) => {
            const serverLiked = data.result.liked;
            setIsLiked(serverLiked);
            setLikesCount(data.result.newLikesCount);
            lastServerLiked.current = serverLiked;
          },
          onError: () => {
            setIsLiked(!currentIsLiked);
            setLikesCount(currentIsLiked ? likesCount - 1 : likesCount + 1);
          },
        },
      );
    }
  }, 300);

  const handleLikeClick = async () => {
    if (!isLoggedIn) {
      const result = await confirm(
        '로그인이 필요한 서비스입니다. 로그인하시겠습니까?',
        '로그아웃',
        '취소',
      );

      if (result) {
        navigate(ROUTES.LOGIN);
      }
      return;
    }

    // Optimistic Update
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? likesCount + 1 : likesCount - 1;

    setIsLiked(nextIsLiked);
    setLikesCount(nextCount);

    if (nextIsLiked) {
      setIsAnimating(true);
    }

    // Call Debounced API
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

      <button
        onClick={handleLikeClick}
        className="group relative transform transition-transform duration-100 ease-out active:scale-90"
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
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

      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {likesCount} likes
      </span>
    </div>
  );
};

export default LikeButton;
