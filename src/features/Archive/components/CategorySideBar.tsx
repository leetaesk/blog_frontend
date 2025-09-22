import { Link } from 'react-router-dom';

import { useGetCategories } from '@/features/Archive/hooks/useGetCategories';

const CategorySideBar = () => {
  const { categories, isLoading, isError } = useGetCategories();

  if (isLoading) {
    return (
      <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
        <h3 className="mb-4 text-xl font-bold">카테고리</h3>
        <p className="text-red-500">에러가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-compWhite dark:bg-compDark rounded-xl p-6 shadow-lg">
      <h3 className="mb-4 text-xl font-bold">카테고리</h3>
      <ul className="space-y-2">
        {categories?.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/archive?category=${cat.name}`}
              className="flex items-center justify-between text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
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
