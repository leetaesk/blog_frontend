import HeroSection from '@/ui/Main/components/HeroSection';
import RecentPostsSection from '@/ui/Main/components/RecentPostsSection';

/**
 * 메인페이지
 */
const MainPage = () => {
  return (
    <div className="bg-background text-foreground w-full max-w-[1480px]">
      <main>
        <HeroSection />
        <RecentPostsSection />
      </main>
    </div>
  );
};

export default MainPage;
