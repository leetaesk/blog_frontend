import toast from 'react-hot-toast';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';

import CalendarIcon from '@/assets/icons/CalendarIcon';
// import EyeIcon from '@/assets/icons/EyeIcon';
import { confirm } from '@/components/ConfirmToast';
import ProfileImage from '@/components/ProfileImage';
import { ROUTES, urlFor } from '@/constants/routes';
import { useDeletePost, useGetPostById } from '@/features/posts/posts.hook';
import useUserStore from '@/store/useUserStore';
import CommentSection from '@/ui/PostDetail/components/CommentSection';
import LikeButton from '@/ui/PostDetail/components/LikeButton';
import '@/ui/PostDetail/postDetail.css';

/**
 * 게시글 상세 페이지 - 심장
 */
const PostDetailPage = () => {
  const navigate = useNavigate();
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = parseInt(postIdStr || '', 10);
  const userId = useUserStore((s) => s.userId);

  const initialData = useLoaderData();

  // postId가 유효한 숫자인 경우에만 쿼리를 실행합니다.
  const { data: post, isError } = useGetPostById({ postId, initialData: initialData });
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  // if (isLoading) return;
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

  const isOwner = userId === post.author.id;

  // 3. 삭제 버튼 핸들러
  const handleDelete = async () => {
    const result = await confirm('정말 이 게시글을 삭제하시겠습니까?', '삭제', '취소');
    if (result) {
      deletePost(
        { postId },
        {
          onSuccess: (data) => {
            navigate(ROUTES.ARCHIVE);
            toast.success(`${data.postId}번 게시글이 삭제되었습니다.`);
          },
        },
      );
    }
  };

  // --- 데이터 로딩 성공 시 렌더링 ---
  return (
    <section className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite mx-auto w-full max-w-4xl sm:px-6 sm:py-8 md:py-12 lg:px-8">
      {isOwner && (
        <div className="mb-4 flex justify-end gap-x-3">
          <Link
            to={urlFor.editPost(post.id)}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      )}
      <article className="bg-compWhite dark:bg-compDark rounded-2xl p-4 shadow-xl sm:p-8 md:p-12">
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

        <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-y border-gray-200 py-4 text-gray-500 sm:items-center dark:border-gray-700 dark:text-gray-400">
          {/* 프사랑 이름이랑 날짜 박스 */}
          {/* Todo: 조회수 로직 완성 시 원상복구 */}
          {/* <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6"> */}
          <div className="flex flex-wrap items-center gap-6">
            {/* 프사랑 이름 */}
            <div className="flex items-center">
              <div className="mr-3 h-10 w-10 overflow-hidden rounded-full">
                <ProfileImage src={post.author.profileImageUrl} alt={post.author.nickname} />
              </div>
              <span className="font-semibold">{post.author.nickname}</span>
            </div>
            {/* 날짜 */}
            <div className="flexitems-center">
              <CalendarIcon />
              <span>{post.createdAt.split(' ')[0]}</span> {/* 날짜만 표시 */}
            </div>
          </div>
          {/* 조회수 */}
          {/* <div className="flex items-center">
            <EyeIcon />
            <span>{post.views} views</span>
          </div> */}
        </div>

        <div
          className="prose prose-lg post-content dark:prose-invert prose-p:text-textDark dark:prose-p:text-textWhite prose-h3:text-textDark dark:prose-h3:text-textWhite prose-strong:text-textDark dark:prose-strong:text-textWhite max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* --- [수정됨] Tags & Like Section --- */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* LikeButton (Right) */}
            <div className="flex-shrink-0">
              <LikeButton
                postId={postId}
                initialLikesCount={post.likesCount}
                initialIsLiked={post.isLikedByUser}
              />
            </div>
            {/* Tags (Left) */}
            <div className="flex flex-wrap items-center gap-3">
              {post.tags.length > 0 &&
                post.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    # {tag.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </article>

      <div className="mt-12">
        <CommentSection postId={postId} />
      </div>

      <div className="my-12 text-center sm:mt-12 sm:mb-0">
        <Link
          to={ROUTES.ARCHIVE}
          className="bg-compWhite dark:bg-compDark inline-block rounded-lg px-6 py-3 font-bold shadow-md transition-shadow hover:shadow-lg"
        >
          &larr; 목록으로 돌아가기
        </Link>
      </div>
    </section>
  );
};

export default PostDetailPage;
