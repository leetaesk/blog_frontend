import { Link } from 'react-router-dom';

import { useGetCommentsCreatedByMe } from '@/features/comments/comments.hook';
import { formatDate } from '@/utils/formatDate';

/**
 * '내가 작성한 댓글' 섹션 컴포넌트
 */
const CommentsCreatedByMeSection = () => {
  // useGetCommentsCreatedByMe 훅을 사용하여 데이터 페칭
  // react-query와 같은 훅은 보통 isLoading, isError 상태도 함께 반환합니다.
  const { data, isLoading, isError } = useGetCommentsCreatedByMe();

  // 1. 로딩 중 UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-48 text-gray-500 dark:text-gray-400">
        <p>댓글을 불러오는 중입니다...</p>
        {/* 로딩 스피너 컴포넌트를 여기에 추가할 수 있습니다. */}
      </div>
    );
  }

  // 2. 에러 발생 UI
  if (isError || !data) {
    return (
      <div className="flex items-center justify-center w-full h-48 text-red-500">
        <p>댓글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 3. 데이터 성공적으로 로드
  const { comments = [], commentCount = 0 } = data || {};

  // 4. 작성한 댓글이 없는 경우 UI
  if (commentCount === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48 text-gray-500 dark:text-gray-400">
        <p>작성한 댓글이 없습니다.</p>
      </div>
    );
  }

  // 5. 댓글 목록 UI
  return (
    <section className="w-full max-w-4xl px-4 py-8 mx-auto">
      <h2 className="pb-4 mb-8 text-3xl font-bold text-gray-900 border-b dark:text-white">
        내가 작성한 댓글
        <span className="ml-2 text-2xl text-blue-600 dark:text-blue-400">({commentCount}개)</span>
      </h2>
      <div className="space-y-6">
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-xl ring-1 ring-gray-200 hover:shadow-2xl dark:bg-gray-800 dark:ring-gray-700"
          >
            <div className="p-6">
              {/* 내가 작성한 댓글 내용 */}
              <blockquote className="relative p-4 text-lg font-medium text-gray-800 border-l-4 border-blue-500 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100">
                <p>"{comment.content}"</p>
              </blockquote>

              {/* 댓글이 달린 게시물 정보 */}
              <div className="pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
                <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  작성한 게시물
                </span>
                {/* react-router-dom의 Link 컴포넌트를 사용한다고 가정합니다.
                  '/posts/:id'와 같은 라우트 구조를 따른다고 가정합니다.
                */}
                <Link
                  to={`/posts/${comment.post.id}`}
                  className="flex items-center p-3 mt-2 space-x-4 transition-colors bg-white rounded-lg group hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    src={comment.post.thumbnailUrl || undefined}
                    alt={comment.post.title}
                    className="flex-shrink-0 object-cover w-16 h-16 border rounded-md dark:border-gray-600"
                    // 이미지 로드 실패 시 대체 이미지
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/100x100/e0e0e0/757575?text=Image`;
                      e.currentTarget.alt = '이미지 로드 실패';
                    }}
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base font-semibold text-blue-700 truncate group-hover:underline dark:text-blue-400">
                      {comment.post.title}
                    </h3>
                  </div>
                </Link>
              </div>

              {/* 댓글 메타 정보 (작성일, 좋아요 수) */}
              <div className="flex items-center justify-between mt-5 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-xs">{formatDate(comment.createdAt)}</span>
                <div className="flex items-center space-x-1">
                  {/* 좋아요 아이콘 (인라인 SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Z" />
                  </svg>
                  <span>{comment.likesCount}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommentsCreatedByMeSection;
