import { Link } from 'react-router-dom';

import { useGetCategories } from '@/features/Archive/hooks/useGetCategories';

const CategorySideBar = () => {
  const { categories, isLoading, isError } = useGetCategories();

  if (isLoading) {
    return (
      <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
        <h3 className="text-xl font-bold mb-4">카테고리</h3>
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
        <h3 className="text-xl font-bold mb-4">카테고리</h3>
        <p className="text-red-500">에러가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
      <h3 className="text-xl font-bold mb-4">카테고리</h3>
      <ul className="space-y-2">
        {categories?.map((cat) => (
          <li key={cat.id}>
            <Link
              to={`/archive?category=${cat.name}`}
              className="flex justify-between items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
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
