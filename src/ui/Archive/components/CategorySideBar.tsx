import { Link, useSearchParams } from 'react-router-dom';

import { useGetCategories } from '@/features/category/category.hook';

const CategorySideBar = () => {
  const { data: categories, isLoading, isError } = useGetCategories();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');

  // 활성화 상태에 따른 공통 클래스
  const commonLinkClasses =
    'flex items-center justify-between text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400';
  const activeLinkClasses = 'font-bold text-indigo-600 dark:text-indigo-400';

  if (isLoading) {
    // ✨ 로딩 상태 스켈레톤 UI 개선
    return (
      <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <div className="space-y-3">
          <div className="h-5 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <p className="text-red-500">카테고리를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold">카테고리</h3>
      <ul className="space-y-2">
        {/* ✨ '전체' 카테고리 링크 추가 */}
        <li>
          <Link
            to="/archive"
            className={`${commonLinkClasses} ${!currentCategory ? activeLinkClasses : ''}`}
          >
            <span>전체</span>
            <span className="text-sm font-light">
              {categories?.reduce((acc: any, cur: any) => acc + cur.postCount, 0)}
            </span>
          </Link>
        </li>

        {categories?.map((cat: any) => (
          <li key={cat.id}>
            <Link
              to={`/archive?category=${cat.name}`}
              // ✨ 현재 URL의 카테고리와 일치하면 활성화 클래스 적용
              className={`${commonLinkClasses} ${
                currentCategory === cat.name ? activeLinkClasses : ''
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-sm font-light">{cat.postCount}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySideBar;
