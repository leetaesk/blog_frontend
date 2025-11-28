import clsx from 'clsx';
import { Link } from 'react-router-dom';

import ChatBubbleIcon from '@/assets/icons/ChatBubbleIcon';
import { urlFor } from '@/constants/routes';
import type { PostListItem } from '@/types/CommonTypes';

interface PostCardProps {
  post: PostListItem;
}

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={urlFor.postDetail(post.id)} key={post.id} className="block h-full">
      <article
        className={clsx(
          // [기본 스타일] 배경, 오버플로우 처리
          'group bg-compWhite dark:bg-compDark h-full overflow-hidden',

          // [변경점 1: 컨테이너 레이아웃]
          // 기존: 항상 세로 배치(flex-col), 둥근 모서리, 그림자
          // 변경(Mobile): 가로 반전 배치(flex-row-reverse)로 텍스트 왼쪽-이미지 오른쪽 구현, 리스트형 보더(border-b)
          'flex flex-row-reverse items-start border-b border-gray-100 py-5 dark:border-gray-800',

          // 변경(PC md:): 기존 카드 스타일 복구 (세로 배치, 그림자, 둥근 모서리)
          'md:flex-col md:items-stretch md:border-0 md:py-0',
          'md:rounded-xl md:shadow-lg md:transition-transform md:duration-300 md:hover:-translate-y-2',
        )}
      >
        {/* 이미지 영역 */}
        {post.thumbnailUrl && (
          <div
            className={clsx(
              // [기본 스타일]
              'flex-shrink-0 overflow-hidden',

              // [변경점 2: 썸네일 크기 및 위치]
              // 기존: h-48 w-full (상단 꽉 채움)
              // 변경(Mobile): w-20 h-20 (80px 정사각형), 텍스트와 간격(ml-4), 모서리 둥글게(rounded-lg)
              'ml-4 h-20 w-20 rounded-lg',

              // 변경(PC md:): 기존 스타일 복구 (상단 꽉 채움, 모서리 직각)
              'md:ml-0 md:h-48 md:w-full md:rounded-none',
            )}
          >
            <img
              src={post.thumbnailUrl}
              alt={`${post.title} 썸네일`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}

        {/* 텍스트 영역 */}
        <div
          className={clsx(
            // [기본 스타일]
            'flex flex-grow flex-col justify-between',

            // [변경점 3: 내부 여백]
            // 기존: px-6 py-3 (항상 패딩 있음)
            // 변경(Mobile): 패딩 제거 (부모 요소의 py-5로 간격 유지)
            // 변경(PC md:): 기존 패딩 복구 및 요소 간격(gap-1) 추가
            'md:gap-1 md:px-6 md:py-3',
          )}
        >
          {/* 카테고리 (변경 없음) */}
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
              {post.category.name}
            </span>
          </div>

          {/* 제목 */}
          <h2
            className={clsx(
              'line-clamp-2 leading-snug font-bold text-gray-900 dark:text-gray-100',
              // [변경점 4: 폰트 사이즈]
              // 기존: text-lg
              // 변경(Mobile): text-base (모바일에서 조금 더 작게) -> sm에서 text-lg 복구
              'text-base md:text-lg',
            )}
          >
            {post.title}
          </h2>

          {/* 요약글 */}
          <div className="mt-1 flex-1">
            <p
              className={clsx(
                'line-clamp-2 text-xs text-gray-500 dark:text-gray-400',
                // [변경점 5: 줄 수 제한]
                // 기존: line-clamp-3 (3줄)
                // 변경(Mobile): line-clamp-2 (2줄로 줄임) -> sm에서 3줄 복구 및 글자색 진하게
                'md:line-clamp-3 md:text-gray-600',
              )}
            >
              {post.summary}
            </p>
          </div>

          {/* 하단 메타 정보 */}
          <div
            className={clsx(
              'mt-2 flex items-center text-gray-400 dark:text-gray-500',
              // [변경점 6: 메타 정보 폰트]
              // 기존: text-sm
              // 변경(Mobile): text-xs (더 작게) -> sm에서 text-sm 복구
              'text-xs md:text-sm',
            )}
          >
            <span>{post.createdAt}</span>
            <span className="mx-2">&middot;</span>
            <div className="flex items-center">
              <ChatBubbleIcon />
              <span className="ml-1">{post.commentCount}</span>
            </div>
            <div className="ml-3 flex items-center">
              <HeartIcon />
              <span className="ml-1">{post.likesCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
