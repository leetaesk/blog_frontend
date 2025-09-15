import { Link } from 'react-router-dom';

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
const ArchiveSideBar = () => {
  return (
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
  );
};

export default ArchiveSideBar;
