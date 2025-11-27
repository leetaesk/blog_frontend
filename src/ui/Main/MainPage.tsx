import HeroSection from '@/ui/Main/components/HeroSection';
import RecentPostsSection from '@/ui/Main/components/RecentPostsSection';

/**
 * 메인페이지
 * max-w-7xl (80rem: 1280px)
 */
const MainPage = () => {
  return (
    <main className="bg-background text-foreground w-full max-w-7xl">
      <HeroSection />
      <RecentPostsSection />
    </main>
  );
};

export default MainPage;
