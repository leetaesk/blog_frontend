import React from 'react';

import { Link } from 'react-router-dom';

// --- Mock Data & Types (실제로는 별도 파일로 분리됩니다) ---

interface Category {
  id: number;
  name: string;
  postCount: number;
}

interface Post {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
  category: Category;
  thumbnailUrl?: string;
  commentCount: number;
}

const mockCategories: Category[] = [
  { id: 1, name: 'React', postCount: 3 },
  { id: 2, name: 'TypeScript', postCount: 2 },
  { id: 3, name: 'Node.js', postCount: 1 },
  { id: 4, name: '일상', postCount: 1 },
];

const mockPosts: Post[] = [
  {
    id: 'post-1',
    title: 'Zustand로 가볍게 시작하는 상태 관리',
    summary:
      'Redux의 복잡함에 지쳤다면? Zustand는 정말 좋은 대안이 될 수 있습니다. 가볍고 직관적인 API로 React 상태 관리를...',
    createdAt: '2025-09-10',
    category: mockCategories[0],
    thumbnailUrl: 'https://placehold.co/600x400/7c3aed/ffffff?text=Zustand',
    commentCount: 12,
  },
  {
    id: 'post-2',
    title: 'React + TypeScript 프로젝트 초기 설정 가이드',
    summary:
      'Create React App 없이 Vite를 사용하여 빠르고 효율적인 React + TypeScript 개발 환경을 구축하는 방법을 알아봅니다.',
    createdAt: '2025-09-08',
    category: mockCategories[1],
    thumbnailUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=React+TS',
    commentCount: 5,
  },
  {
    id: 'post-3',
    title: 'Tailwind CSS 다크 모드, 완벽 정복!',
    summary:
      'Tailwind CSS의 클래스 기반 접근법을 사용하여 손쉽게 라이트/다크 모드를 구현하고 사용자 경험을 향상시키는 팁들을 공유합니다.',
    createdAt: '2025-09-05',
    category: mockCategories[0],
    commentCount: 23,
  },
  {
    id: 'post-4',
    title: 'Express와 TypeScript로 만드는 REST API 서버',
    summary:
      'Node.js 환경에서 Express 프레임워크와 TypeScript를 결합하여 타입 안정성을 갖춘 REST API 서버를 구축하는 과정을 단계별로 설명합니다.',
    createdAt: '2025-09-02',
    category: mockCategories[2],
    thumbnailUrl: 'https://placehold.co/600x400/16a34a/ffffff?text=Express',
    commentCount: 8,
  },
  {
    id: 'post-5',
    title: '첫 일본 여행, 도쿄 3박 4일 기록',
    summary:
      '코로나 이후 3년 만에 떠난 해외 여행. 시부야, 신주쿠, 아키하바라를 넘나들며 겪었던 다양한 에피소드와 맛집들을 소개합니다.',
    createdAt: '2025-08-28',
    category: mockCategories[3],
    thumbnailUrl: 'https://placehold.co/600x400/f97316/ffffff?text=Tokyo',
    commentCount: 15,
  },
  {
    id: 'post-6',
    title: 'useMemo와 useCallback, 언제 사용해야 할까?',
    summary:
      'React 렌더링 최적화의 핵심, useMemo와 useCallback 훅의 차이점을 명확히 이해하고 올바른 사용 사례를 통해 성능을 개선해봅시다.',
    createdAt: '2025-08-25',
    category: mockCategories[0],
    thumbnailUrl: 'https://placehold.co/600x400/f43f5e/ffffff?text=React+Hooks',
    commentCount: 7,
  },
];

// --- Icon Components (SVG) ---

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline-block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline-block"
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

const ChatBubbleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1 inline-block"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

// --- Main Page Component ---

const ArchivePage = () => {
  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Blog Archive</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            제가 공부하고 경험한 모든 이야기들을 이곳에 기록합니다.
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar (왼쪽으로 이동) */}
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              {/* Search Box */}
              <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
                <h3 className="text-xl font-bold mb-4">검색</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    className="w-full py-2 pl-3 pr-10 rounded-md bg-bgWhite dark:bg-bgDark border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-compWhite dark:bg-compDark p-6 rounded-xl shadow-lg dark:shadow-gray-800">
                <h3 className="text-xl font-bold mb-4">카테고리</h3>
                <ul className="space-y-2">
                  {mockCategories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={`/archive?category=${category.name.toLowerCase()}`}
                        className="flex justify-between items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="text-sm font-light">{category.postCount}</span>
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
              {mockPosts.map((post) => (
                <Link to={`/posts/${post.id}`} key={post.id}>
                  <article
                    className="bg-compWhite dark:bg-compDark rounded-xl shadow-lg dark:shadow-gray-800 overflow-hidden 
                                transform hover:-translate-y-2 transition-transform duration-300 group h-full flex flex-col"
                  >
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
              ))}
            </div>

            {/* Pagination */}
            <nav className="mt-12 flex justify-center">
              <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                  <Link
                    to="/archive?page=1"
                    className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-compWhite border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite"
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 1 1 5l4 4"
                      />
                    </svg>
                  </Link>
                </li>
                {/* Page numbers would be dynamically generated */}
                <li>
                  <Link
                    to="/archive?page=1"
                    aria-current="page"
                    className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-600 dark:bg-bgDark dark:text-textWhite"
                  >
                    1
                  </Link>
                </li>
                <li>
                  <Link
                    to="/archive?page=2"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-compWhite border border-gray-300 hover:bg-gray-100 dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite"
                  >
                    2
                  </Link>
                </li>
                <li>
                  <Link
                    to="/archive?page=2"
                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-compWhite border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 dark:bg-compDark dark:border-gray-600 dark:text-gray-400 dark:hover:bg-bgDark dark:hover:text-textWhite"
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-3 h-3 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
