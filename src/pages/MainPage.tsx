import React, { type ReactNode, useEffect, useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useGetPosts } from '@/features/Archive/hooks/useGetPosts';
import useThemeStore from '@/store/themeStore';

// 기존에 만드신 훅

// 알려주신 Zustand 스토어

// --- 헬퍼 컴포넌트 및 아이콘 (파일 내부에 포함) ---

// 1. 스크롤 애니메이션 컴포넌트
interface ScrollRevealProps {
  children: ReactNode;
  stagger?: boolean;
}

const ScrollReveal = ({ children, stagger = false }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ? 0.15 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {stagger ? (
        React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
};

// 2. SVG 아이콘들
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);

// --- 각 섹션 컴포넌트 (파일 내부에 포함) ---

const HeroSection = () => (
  <section className="text-center min-h-screen flex flex-col justify-center items-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground">
        안녕하세요, 이태석입니다.
      </h1>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
        신소재에서 코드로, 아이디어를 현실로 만드는 개발자입니다. <br />
        비전공자로서의 경험을 바탕으로 꾸준히 성장하며 가치를 만듭니다.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/path-to-resume.pdf"
          target="_blank"
          className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          이력서 보기
        </a>
        <a
          href="https://github.com/leetaesk"
          rel="noopener"
          target="_blank"
          className="px-6 py-3 bg-card text-card-foreground font-semibold rounded-lg shadow-md hover:bg-accent transition-colors"
        >
          GitHub
        </a>
      </div>
    </motion.div>
  </section>
);

const ProjectSection = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Featured Project
        </h2>
        <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img
              className="h-64 w-full object-cover md:h-full"
              src="https://placehold.co/800x600/7c3aed/ffffff?text=grabPT"
              alt="grabPT project screenshot"
            />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">
              Front-end Lead
            </div>
            <h3 className="mt-1 text-2xl font-bold text-card-foreground">grabPT</h3>
            <p className="mt-2 text-muted-foreground">
              사용자 맞춤형 PT 트레이너 매칭 서비스. React와 TypeScript를 사용하여 인터랙티브한
              UI/UX를 설계하고 구현을 리드했습니다.
            </p>
            <div className="mt-4">
              <a
                rel="noopener"
                href="http://www.grabpt.com"
                target="_blank"
                className="text-primary hover:underline font-medium group inline-flex items-center"
              >
                사이트 방문하기 <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </section>
);

const RecentPostsSection = () => {
  const { posts, isLoading } = useGetPosts({ page: 1, limit: 4 });

  if (isLoading)
    return <div className="text-center py-24 text-muted-foreground">Loading posts...</div>;

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollReveal stagger>
            {posts?.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <article className="bg-card rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group h-full flex flex-col">
                  <div className="overflow-hidden h-48">
                    <img
                      src={post.thumbnailUrl || undefined}
                      alt={`${post.title} 썸네일`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-sm font-medium text-primary">{post.category.name}</span>
                    <h3 className="text-lg font-bold mt-2 flex-grow text-card-foreground">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-4">{post.createdAt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </ScrollReveal>
        </div>
        <div className="text-center mt-12">
          <Link
            to="/archive"
            className="text-primary hover:underline font-medium group inline-flex items-center"
          >
            모든 글 보기 <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- 최종 메인 페이지 컴포넌트 ---

const MainPage = () => {
  const { theme, toggleTheme } = useThemeStore();

  // Zustand 스토어의 theme 상태가 변경될 때마다 <html> 태그에 'dark' 클래스를 적용/제거합니다.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // 기존 클래스 제거
    root.classList.add(theme); // 현재 테마 클래스 추가
  }, [theme]);

  return (
    // bg-background, text-foreground 등 index.css에 정의된 CSS 변수를 사용합니다.
    <div className="bg-background text-foreground">
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-2 rounded-full bg-card shadow-lg z-50 border border-border"
        aria-label="Toggle Dark Mode"
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <main>
        <HeroSection />
        <ProjectSection />
        <RecentPostsSection />
      </main>

      <footer className="text-center py-8 text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} Taeseok Lee. All Rights Reserved.
      </footer>
    </div>
  );
};

export default MainPage;
