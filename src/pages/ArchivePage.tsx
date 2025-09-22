import { useSearchParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import ArchiveSideBar from '@/features/Archive/components/CategorySideBar';
import PostCard from '@/features/Archive/components/PostCard';
import SearchSideBar from '@/features/Archive/components/SearchSideBar';
import { useGetPosts } from '@/features/Archive/hooks/useGetPosts';

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');

  const { posts, pagination, isLoading, isError, error } = useGetPosts({
    page,
    // 한 페이지당 8개로 하드코딩
    limit: 12,
    category: category || undefined,
  });

  /** 페이지 변경 시 URL의 쿼리 파라미터를 업데이트하는 핸들러 */
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    //params로 세팅시 문자열로 변환
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (isError) {
    return <div className="flex h-screen items-center justify-center">Error: {error?.message}</div>;
  }

  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight md:text-4xl">Blog Archive</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            제가 공부하고 경험한 모든 이야기들을 이곳에 기록합니다.
          </p>
        </header>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full min-w-48 md:w-1/3 lg:w-1/3 2xl:w-1/4">
            <div className="sticky top-24 space-y-8">
              <SearchSideBar />

              {/* Categories */}
              <ArchiveSideBar />
            </div>
          </aside>

          {/* Main Content: Post Grid */}
          <main className="w-full">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {posts && posts.length > 0 ? (
                posts.map((post) => <PostCard post={post} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">게시글이 없습니다.</p>
              )}
            </div>

            {/* Pagination */}
            {pagination && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPage={pagination.totalPage}
                onPageChange={handlePageChange}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
