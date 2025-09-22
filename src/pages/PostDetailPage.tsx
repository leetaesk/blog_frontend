import { Link, useParams } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
}

interface Author {
  name: string;
  avatarUrl: string;
  bio: string;
}

interface PostDetail {
  id: string;
  title: string;
  content: string; // 상세 페이지에는 전체 본문(HTML)이 들어갑니다.
  createdAt: string;
  category: Category;
  author: Author;
  thumbnailUrl?: string;
}

// 아카이브 페이지의 mockPosts와 ID를 공유하는 상세 페이지용 목업 데이터입니다.
const mockPostDetails: PostDetail[] = [
  {
    id: 'post-1',
    title: 'Zustand로 가볍게 시작하는 상태 관리',
    content: `
      <p class="text-lg leading-relaxed">Redux의 복잡함과 Boilerplate에 지치셨나요? Zustand는 React 애플리케이션을 위한 작고 빠르며 확장성 있는 상태 관리 솔루션입니다. MobX와 Redux의 아이디어에서 영감을 받았지만, 훨씬 더 간단한 API를 제공합니다.</p>
      <br/>
      <h3 class="text-2xl font-bold my-6">Zustand의 핵심 장점</h3>
      <ul class="list-disc list-inside space-y-3 pl-2">
        <li><strong>최소한의 API:</strong> 몇 분 안에 배우고 바로 사용할 수 있을 만큼 API가 간단하고 직관적입니다.</li>
        <li><strong>Provider가 필요 없음:</strong> Redux처럼 앱 전체를 Provider로 감쌀 필요가 없습니다. 어느 컴포넌트에서든 자유롭게 스토어를 가져와 사용할 수 있습니다.</li>
        <li><strong>렌더링 최적화:</strong> 상태의 특정 부분만 구독하여 불필요한 리렌더링을 자동으로 방지합니다. 성능에 민감한 애플리케이션에 매우 유리합니다.</li>
      </ul>
      <br/>
      <blockquote class="border-l-4 border-indigo-400 pl-4 py-2 my-6 italic">
        "Simplicity is the ultimate sophistication." - Leonardo da Vinci
      </blockquote>
      <p class="text-lg leading-relaxed">이 포스트에서는 Zustand의 기본 설정 방법부터 실제 프로젝트에 적용하는 고급 팁까지 자세히 다뤄보겠습니다. 코드를 통해 직접 확인해보세요.</p>
    `,
    createdAt: '2025-09-10',
    category: { id: 1, name: 'React' },
    author: {
      name: 'Dev-John',
      avatarUrl: 'https://placehold.co/100x100/a78bfa/ffffff?text=John',
      bio: '프론트엔드 개발자. 클린 코드와 UI/UX에 관심이 많습니다.',
    },
    thumbnailUrl: 'https://placehold.co/1200x600/7c3aed/ffffff?text=Zustand',
  },
  {
    id: 'post-2',
    title: 'React + TypeScript 프로젝트 초기 설정 가이드',
    content: `
        <p class="text-lg leading-relaxed">Vite는 차세대 프론트엔드 개발 도구로, 놀랍도록 빠른 개발 서버와 최적화된 빌드 프로세스를 제공합니다. 더 이상 Create React App의 느린 속도와 복잡한 설정에 얽매일 필요가 없습니다.</p>
        <br/>
        <h3 class="text-2xl font-bold my-6">Vite를 사용해야 하는 이유</h3>
        <ul class="list-disc list-inside space-y-3 pl-2">
            <li><strong>엄청나게 빠른 속도:</strong> Native ESM을 기반으로 한 개발 서버는 거의 즉각적인 Hot Module Replacement(HMR)를 제공합니다.</li>
            <li><strong>간결한 설정:</strong> TypeScript, JSX, CSS 등을 별도 설정 없이 바로 지원합니다.</li>
            <li><strong>최적화된 빌드:</strong> Rollup을 사용하여 프로덕션 빌드를 매우 효율적으로 만들어줍니다.</li>
        </ul>
        <br/>
        <p class="text-lg leading-relaxed">이제 터미널을 열고 <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md font-mono">npm create vite@latest</code> 명령어를 실행하여 새로운 프로젝트를 시작해봅시다.</p>
    `,
    createdAt: '2025-09-08',
    category: { id: 2, name: 'TypeScript' },
    author: {
      name: 'Dev-John',
      avatarUrl: 'https://placehold.co/100x100/a78bfa/ffffff?text=John',
      bio: '프론트엔드 개발자. 클린 코드와 UI/UX에 관심이 많습니다.',
    },
    thumbnailUrl: 'https://placehold.co/1200x600/3b82f6/ffffff?text=React+TS',
  },
  // ... 다른 게시글(post-3 ~ post-6)에 대한 상세 데이터도 여기에 추가할 수 있습니다.
];

// --- Icon Components (SVG) ---
const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="mr-1.5 inline-block h-5 w-5"
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

// --- Main Page Component ---
const PostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = mockPostDetails.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite flex min-h-screen flex-col items-center justify-center px-4">
        <h2 className="mb-4 text-center text-3xl font-bold">게시글을 찾을 수 없습니다.</h2>
        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          요청하신 페이지가 존재하지 않거나, 다른 주소로 옮겨졌을 수 있습니다.
        </p>
        <Link
          to="/archive"
          className="rounded-lg bg-indigo-600 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-700"
        >
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bgWhite dark:bg-bgDark text-textDark dark:text-textWhite min-h-screen py-8 md:py-12">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="bg-compWhite dark:bg-compDark rounded-2xl p-6 shadow-xl sm:p-8 md:p-12">
          <header className="mb-8">
            <Link
              to={`/archive?category=${post.category.name.toLowerCase()}`}
              className="mb-2 inline-block font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {post.category.name}
            </Link>
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
              {post.title}
            </h1>
          </header>

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-gray-200 py-4 text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="mr-3 h-10 w-10 rounded-full"
              />
              <span className="font-semibold">{post.author.name}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon />
              <span>{post.createdAt}</span>
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
            className="prose prose-lg dark:prose-invert prose-p:text-textDark dark:prose-p:text-textWhite prose-h3:text-textDark dark:prose-h3:text-textWhite prose-strong:text-textDark dark:prose-strong:text-textWhite max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author Profile Section */}
        <section className="bg-compWhite dark:bg-compDark mt-12 flex items-center rounded-2xl p-8 shadow-xl">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="mr-6 h-20 w-20 rounded-full"
          />
          <div>
            <h4 className="text-xl font-bold">{post.author.name}</h4>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{post.author.bio}</p>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/archive"
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
