import { Link } from 'react-router-dom';

import ProfileImage from '@/components/ProfileImage';
import { urlFor } from '@/constants/routes';
import type { MyCommentResult } from '@/features/comments/comments.dto';
import useUserStore from '@/store/useUserStore';
import { formatDate } from '@/utils/formatDate';

interface CommentCreatedByMeProps {
  comment: MyCommentResult;
}

const CommentCreatedByMe = ({ comment }: CommentCreatedByMeProps) => {
  const userInfo = useUserStore((s) => s.userInfo);
  return (
    <article
      key={comment.id}
      className="dark:bg-background overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl"
    >
      {/* 댓글 박스 */}
      <div className="flex items-start justify-between">
        {/* 사진, 이름, 댓글내용 */}
        <div className="flex items-center gap-4">
          <div className="mb-2 h-10 w-10 min-w-10 overflow-hidden rounded-full">
            <ProfileImage src={userInfo?.profileImageUrl} alt={'프로필사진'} />
          </div>
          <div>
            <div className="flex flex-wrap items-end gap-2">
              <span className="text-sm font-semibold">{userInfo?.nickname}</span>
              {/* md 이하에서 날짜만보이게 => observer쓰기 싫어서 걍 span 두개씀 ㅋㅋ */}
              <span className="hidden text-xs md:inline">
                {formatDate({ dateString: comment.createdAt })}
              </span>
              <span className="text-xs md:hidden">
                {formatDate({ dateString: comment.createdAt, onlyDay: true })}
              </span>
            </div>
            <p className="mt-1 mb-2 text-base whitespace-pre-wrap">{comment.content}</p>
          </div>
        </div>
        {/* 댓글 좋아요 */}
        <div className="flex items-start space-x-2">
          <span className="text-textDark font-archivo dark:text-textWhite text-lg leading-[1.4rem] font-semibold">
            {comment.likesCount}
          </span>
          <svg
            className={`dark:hover:text-gray-200' ${comment.isLiked ? 'text-red-500' : 'text-gray-500'} h-5 w-5 hover:text-gray-700 dark:text-gray-400`}
            fill={comment.isLiked ? 'currentColor' : 'none'}
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
        </div>
      </div>

      {/* 댓글이 달린 게시물 정보 */}
      <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          작성한 게시물
        </span>
        <Link
          to={urlFor.postDetail(comment.post.id)}
          className="group mt-2 flex items-center space-x-4 rounded-lg bg-white p-3 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            src={comment.post.thumbnailUrl || undefined}
            alt={comment.post.title}
            className="h-16 w-16 flex-shrink-0 rounded-md border object-cover dark:border-gray-600"
            // 이미지 로드 실패 시 대체 이미지
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/100x100/e0e0e0/757575?text=Image`;
              e.currentTarget.alt = '이미지 로드 실패';
            }}
          />
          <div className="min-w-0 flex-grow">
            <h3 className="truncate text-base font-semibold text-blue-700 group-hover:underline dark:text-blue-400">
              {comment.post.title}
            </h3>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default CommentCreatedByMe;
