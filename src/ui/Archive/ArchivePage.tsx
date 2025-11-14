import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import Pagination from '@/components/Pagination';
import { useGetPosts } from '@/features/posts/archive/archive.hook';
import ArchiveSideBar from '@/ui/Archive/components/CategorySideBar';
import PostCard from '@/ui/Archive/components/PostCard';
import SearchSideBar from '@/ui/Archive/components/SearchSideBar';
import SkeletonPostCard from '@/ui/Archive/components/SkeletonPostCard';

const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');
  const [searchValue, setSearchValue] = useState<string>('');

  const { posts, pagination, isLoading, isError, error } = useGetPosts({
    page,
    // 한 페이지당 12개로 하드코딩
    limit: 12,
    category: category || undefined,
    search: searchValue,
  });

  /** 페이지 변경 시 URL의 쿼리 파라미터를 업데이트하는 핸들러 */
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    //params로 세팅시 문자열로 변환
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  if (isError) {
    return <div className="flex items-center justify-center h-screen">Error: {error?.message}</div>;
  }

  return (
    <div className="w-full max-w-6xl min-h-screen bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite">
      <div className="w-full py-12 mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-right font-archivo md:text-4xl">
            LEETAESK'S ARCHIVE
          </h1>
        </header>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Sidebar */}
          <aside className="w-full min-w-48 md:w-1/3 2xl:w-1/4">
            <div className="sticky space-y-8 top-24">
              <SearchSideBar searchValue={searchValue} setSearchValue={setSearchValue} />

              {/* Categories */}
              <ArchiveSideBar />
            </div>
          </aside>

          {/* Main Content: Post Grid */}
          <main className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, index) => <SkeletonPostCard key={index} />)
              ) : posts && posts.length > 0 ? (
                posts.map((post) => <PostCard post={post} key={post.id} />)
              ) : (
                <p className="text-center text-gray-500 col-span-full">게시글이 없습니다.</p>
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
