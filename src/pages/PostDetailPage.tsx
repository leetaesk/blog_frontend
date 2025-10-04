import { Link, useParams } from 'react-router-dom';

import CalendarIcon from '@/assets/icons/CalendarIcon';
import EyeIcon from '@/assets/icons/EyeIcon';
import { ROUTES, urlFor } from '@/constants/routes';
import { useGetPostById } from '@/features/Post/hooks/useGetPostById';
import '@/features/Post/styles/postDetail.css';

// --- Main Page Component ---
const PostDetailPage = () => {
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = parseInt(postIdStr || '', 10);

  // postId가 유효한 숫자인 경우에만 쿼리를 실행합니다.
  const { data: post, isError, isLoading } = useGetPostById({ postId });

  // --- 에러 또는 데이터 없음 처리 ---

  if (isLoading) return;
  if (isError || !post) {
    return (
      <div className="bg-bgWhite dark:bg-bgDark dark:text-textWhite text-textDark flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-center text-3xl font-bold">게시글을 찾을 수 없습니다.</h2>
        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          요청하신 페이지가 존재하지 않거나, 서버에 문제가 발생했을 수 있습니다. 근데 사실 여기까진
          올수가 없죠 ㅋㅋ
        </p>
        <Link
          to={ROUTES.ARCHIVE}
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
                to={urlFor.archive(post.category.name)}
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
                src={post.author.profileImageUrl}
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
            className="prose prose-lg post-content dark:prose-invert prose-p:text-textDark dark:prose-p:text-textWhite prose-h3:text-textDark dark:prose-h3:text-textWhite prose-strong:text-textDark dark:prose-strong:text-textWhite max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* --- Tags Section --- */}
          {post.tags.length > 0 && (
            <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-3">
                {post.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    # {tag.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>

        <div className="mt-12 text-center">
          <Link
            to={ROUTES.ARCHIVE}
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
