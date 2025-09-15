import { Link, useSearchParams } from 'react-router-dom';

import ChatBubbleIcon from '@/components/ChatBubbleIcon';
import Pagination from '@/components/Pagination';
import { useGetPosts } from '@/features/Archive/hooks/useGetPosts';

interface Category {
  id: number;
  name: string;
  postCount: number;
}
const mockCategories: Category[] = [
  { id: 1, name: 'React', postCount: 8 },
  { id: 2, name: 'TypeScript', postCount: 4 },
  { id: 3, name: 'Node.js', postCount: 3 },
  { id: 4, name: '일상', postCount: 4 },
  { id: 5, name: 'PostgreSQL', postCount: 2 },
  { id: 6, name: 'CSS', postCount: 3 },
  { id: 7, name: 'DevOps', postCount: 2 },
];

// --- Main Page Component ---
const ArchivePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');

  const { posts, pagination, isLoading, isError, error } = useGetPosts({
    page,
    limit: 8,
    category: category || undefined,
  });

  /** 페이지 변경 시 URL의 쿼리 파라미터를 업데이트하는 핸들러 */
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Error: {error?.message}</div>;
  }

  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog Archive</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            제가 공부하고 경험한 모든 이야기들을 이곳에 기록합니다.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Search Box */}
              <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
                <h3 className="text-xl font-bold mb-4">검색</h3>
                {/* ... 검색 로직 ... */}
              </div>

              {/* Categories */}
              <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
                <h3 className="text-xl font-bold mb-4">카테고리</h3>
                <ul className="space-y-2">
                  {mockCategories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        to={`/archive?category=${cat.name.toLowerCase()}`}
                        className="flex justify-between items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm font-light">{cat.postCount}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content: Post Grid */}
          <main className="w-full md:w-2/3 lg:w-3/4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Link to={`/posts/${post.id}`} key={post.id}>
                    <article className="bg-compWhite dark:bg-compDark rounded-xl shadow-lg dark:shadow-gray-800 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group h-full flex flex-col">
                      {post.thumbnailUrl && (
                        <div className="overflow-hidden h-56">
                          <img
                            src={post.thumbnailUrl}
                            alt={`${post.title} 썸네일`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                            {post.category.name}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 leading-snug flex-grow">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 my-4 line-clamp-2">
                          {post.summary}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 mt-auto">
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
                ))
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
