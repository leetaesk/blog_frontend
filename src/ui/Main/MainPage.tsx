import React, { type ReactNode, useRef } from 'react';

import { motion, useInView } from 'framer-motion';

import HeroSection from '@/ui/Main/components/HeroSection';
// import ProjectSection from '@/ui/Main/components/ProjectSection';
import RecentPostsSection from '@/ui/Main/components/RecentPostsSection';

// 1. 스크롤 애니메이션 컴포넌트
export interface ScrollRevealProps {
  children: ReactNode;
  stagger?: boolean;
}

export const ScrollReveal = ({ children, stagger = false }: ScrollRevealProps) => {
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

const MainPage = () => {
  return (
    // bg-background, text-foreground 등 index.css에 정의된 CSS 변수를 사용합니다.
    <div className="bg-background text-foreground w-full max-w-[1480px]">
      <main>
        <HeroSection />
        <RecentPostsSection />
        {/* <ProjectSection /> */}
      </main>
    </div>
  );
};

export default MainPage;
