import { Link, useParams } from 'react-router-dom';

import { useGetPostById } from '@/features/Post/hooks/useGetPostById';
import '@/features/Post/styles/postDetail.css';

// --- Icon Components (SVG) ---
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-1.5 inline-block h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-1.5 inline-block h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const TagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-1.5 inline-block h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 15h2v2H7v-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h.01" />
  </svg>
);

// --- Main Page Component ---
const PostDetailPage = () => {
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = parseInt(postIdStr || '', 10);

  // postId가 유효한 숫자인 경우에만 쿼리를 실행합니다.
  const { data: post, isLoading, isError } = useGetPostById({ postId });

  console.log(post);

  // --- 로딩 상태 처리 ---
  if (isLoading) {
    return (
      <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite flex min-h-screen items-center justify-center">
        <div className="text-2xl font-bold">Loading post...</div>
      </div>
    );
  }

  // --- 에러 또는 데이터 없음 처리 ---
  if (isError || !post) {
    return (
      <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-center text-3xl font-bold">게시글을 찾을 수 없습니다.</h2>
        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          요청하신 페이지가 존재하지 않거나, 서버에 문제가 발생했을 수 있습니다.
        </p>
        <Link
          to="/archive"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  // --- 데이터 로딩 성공 시 렌더링 ---
  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen py-8 md:py-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="bg-compWhite dark:bg-compDark rounded-2xl p-6 shadow-xl sm:p-8 md:p-12">
          <header className="mb-8">
            {post.category && (
              <Link
                to={`/archive?category=${post.category.name.toLowerCase()}`}
                className="mb-2 inline-block font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {post.category.name}
              </Link>
            )}
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-gray-200 py-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center">
              <img
                src={`https://placehold.co/100x100/a78bfa/ffffff?text=${post.author.nickname.charAt(0)}`}
                alt={post.author.nickname}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <span className="font-semibold">{post.author.nickname}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon />
              <span>{post.createdAt.split(' ')[0]}</span> {/* 날짜만 표시 */}
            </div>
            <div className="flex items-center">
              <EyeIcon />
              <span>{post.views} views</span>
            </div>
          </div>

          {post.thumbnailUrl && (
            <div className="my-8 overflow-hidden rounded-lg shadow-lg">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div
            className="post-content prose prose-lg dark:prose-invert prose-p:text-textDark dark:prose-p:text-textWhite prose-h3:text-textDark dark:prose-h3:text-textWhite prose-strong:text-textDark dark:prose-strong:text-textWhite max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* --- Tags Section --- */}
          {post.tags.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-3">
                <TagIcon />
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    to={`/archive?tag=${tag.name}`}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 transition-colors hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800"
                  >
                    # {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-12 text-center">
          <Link
            to="/archive"
            className="bg-compWhite dark:bg-compDark inline-block rounded-lg px-6 py-3 font-bold shadow-md transition-shadow hover:shadow-lg"
          >
            &larr; 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
