import { Link } from 'react-router-dom';

import ChatBubbleIcon from '@/components/ChatBubbleIcon';
import { urlFor } from '@/constants/routes';
import type { PostListItem } from '@/features/Archive/types/getPostsType';

interface PostCardProps {
  post: PostListItem;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link to={urlFor.postDetail(post.id)} key={post.id}>
      <article className="bg-compWhite dark:bg-compDark group flex h-full transform flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
        {/* 이미지 */}
        {post.thumbnailUrl && (
          <div className="h-48 overflow-hidden">
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
              <span>{post.commentCount}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
