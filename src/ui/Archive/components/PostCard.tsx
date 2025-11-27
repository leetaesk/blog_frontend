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
    className="h-4 w-4" // 크기 조절 (h-5 w-5 등)
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
    <Link to={urlFor.postDetail(post.id)} key={post.id}>
      {/* 기본적으로 w,h-full 카드 */}
      <article className="bg-compWhite dark:bg-compDark group flex h-full w-full transform flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
        {/* 이미지 */}
        {post.thumbnailUrl && (
          // 이미지 h-48 -> 모바일에서 줄임
          <div className="h-12 overflow-hidden sm:h-48">
            <img
              src={post.thumbnailUrl}
              alt={`${post.title} 썸네일`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        )}
        {/* 텍스트박스 */}
        <div className="flex flex-grow flex-col gap-1 px-6 py-3">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {post.category.name}
          </span>
          <h2 className="line-clamp-2 text-lg leading-snug font-bold">{post.title}</h2>
          <div className="flex-1">
            <p className="my-1 line-clamp-3 text-xs text-gray-600 dark:text-gray-400">
              {post.summary}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
            <span>{post.createdAt}</span>
            <span className="mx-2">&middot;</span>
            <div className="flex items-center">
              <ChatBubbleIcon />
              <span className="ml-1">{post.commentCount}</span>
            </div>
            {/* 좋아요 수 */}
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
