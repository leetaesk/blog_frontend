import React, { type ReactNode, useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useGetPosts } from '@/features/posts/archive/archive.hook';
import HeroSection from '@/ui/Main/components/HeroSection';

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

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1"
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

// const HeroSection = () => (
//   <section className="flex flex-col items-center justify-center w-full min-h-screen text-center">
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.8 }}
//       className="w-full"
//     >
//       <h1 className="font-archivo text-foreground mb-4 w-full text-right text-[226px] leading-none font-normal tracking-[-0.08em]">
//         LEETAESK'S<br></br>ARCHIVE
//       </h1>
//       <p className="max-w-3xl mx-auto text-lg text-muted-foreground md:text-xl">
//         신소재에서 코드로, 아이디어를 현실로 만드는 개발자입니다. <br />
//         비전공자로서의 경험을 바탕으로 꾸준히 성장하며 가치를 만듭니다.
//       </p>
//       <div className="flex justify-center gap-4 mt-8">
//         <a
//           href="/path-to-resume.pdf"
//           target="_blank"
//           className="px-6 py-3 font-semibold transition-opacity rounded-lg shadow-md bg-primary text-primary-foreground hover:opacity-90"
//         >
//           이력서 보기
//         </a>
//         <a
//           href="https://github.com/leetaesk"
//           rel="noopener"
//           target="_blank"
//           className="px-6 py-3 font-semibold transition-colors rounded-lg shadow-md bg-card text-card-foreground hover:bg-accent"
//         >
//           GitHub
//         </a>
//       </div>
//     </motion.div>
//   </section>
// );

const ProjectSection = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="container mx-auto px-4">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          Featured Project
        </h2>
        <div className="bg-card mx-auto max-w-4xl overflow-hidden rounded-xl shadow-lg md:flex">
          <div className="md:w-1/2">
            <img
              className="h-64 w-full object-cover md:h-full"
              src="https://placehold.co/800x600/7c3aed/ffffff?text=grabPT"
              alt="grabPT project screenshot"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:w-1/2">
            <div className="text-primary text-sm font-semibold tracking-wide uppercase">
              Front-end Lead
            </div>
            <h3 className="text-card-foreground mt-1 text-2xl font-bold">grabPT</h3>
            <p className="text-muted-foreground mt-2">
              사용자 맞춤형 PT 트레이너 매칭 서비스. React와 TypeScript를 사용하여 인터랙티브한
              UI/UX를 설계하고 구현을 리드했습니다.
            </p>
            <div className="mt-4">
              <a
                rel="noopener"
                href="http://www.grabpt.com"
                target="_blank"
                className="text-primary group inline-flex items-center font-medium hover:underline"
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
    return <div className="text-muted-foreground py-24 text-center">Loading posts...</div>;

  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-foreground mb-12 text-center text-3xl font-bold md:text-4xl">
          Recent Posts
        </h2>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {posts?.map((post) => (
              <Link to={`/posts/${post.id}`} key={post.id}>
                <article className="bg-card group flex h-full transform flex-col overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.thumbnailUrl || undefined}
                      alt={`${post.title} 썸네일`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <span className="text-primary text-sm font-medium">{post.category.name}</span>
                    <h3 className="text-card-foreground mt-2 flex-grow text-lg font-bold">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-4 text-sm">{post.createdAt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </ScrollReveal>
        <div className="mt-12 text-center">
          <Link
            to="/archive"
            className="text-primary group inline-flex items-center font-medium hover:underline"
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
  return (
    // bg-background, text-foreground 등 index.css에 정의된 CSS 변수를 사용합니다.
    <div className="bg-background text-foreground w-full max-w-[1480px]">
      <main>
        <HeroSection />
        <RecentPostsSection />
        <ProjectSection />
      </main>
    </div>
  );
};

export default MainPage;
