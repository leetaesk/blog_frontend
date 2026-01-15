import { Helmet } from 'react-helmet-async';

import HeroSection from '@/ui/Main/components/HeroSection';
import RecentPostsSection from '@/ui/Main/components/RecentPostsSection';

/**
 * 메인페이지
 * max-w-7xl (80rem: 1280px)
 */
const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>이태석의 블로그</title>
        <meta name="description" content="안녕하세요, 프론트엔드 개발자 이태석입니다." />
        <meta
          name="keywords"
          content="프론트엔드, 백엔드, 풀스택, 웹개발, React, Js, JavaScript, Ts, TypeScript, Node.js, Express, 비전공자 개발자, 신입 개발자 포트폴리오, 기술 블로그, 개발자 회고, 숭실대, 삽질기, 트러블슈팅, 공부기록"
        />
        <meta name="author" content="이태석, Leetaesk" />
      </Helmet>
      <main className="bg-background text-foreground w-full max-w-7xl">
        <HeroSection />
        <RecentPostsSection />
      </main>
    </>
  );
};

export default MainPage;
