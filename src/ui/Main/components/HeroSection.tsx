import { motion } from 'framer-motion';

import { useGetPosts } from '@/features/posts/archive/archive.hook';

const HeroSection = () => {
  const { posts } = useGetPosts({ page: 1, limit: 1 });
  if (!posts) return;
  return (
    <section className="flex min-h-screen w-full flex-col items-center px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* 히어로 텍스트 */}
        <div className="mb-10 border-t-3 border-black py-10 dark:border-t-gray-200">
          <h1 className="font-archivo text-foreground mb-4 w-full text-right text-7xl leading-none font-normal tracking-[-0.08em] sm:text-9xl md:text-[140px] lg:text-[180px] xl:text-[226px]">
            ARCHIVE
          </h1>
        </div>

        {/* 밑에 박스 두개 */}
        <div className="font-archivo text-foreground grid grid-cols-2 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased">
          <div className="border-b-foreground/30 grid grid-cols-2 gap-6 border-t-3 border-b border-black py-2 text-left dark:border-t-gray-200">
            <div>
              <p>
                CINEMATOGRAPHY <br />
                LATEST PRODUCTION
              </p>
            </div>
            <div>
              <p>DEVELOPER</p>
            </div>
          </div>
          <div className="border-b-foreground/30 border-t-3 border-b border-black py-2 text-right dark:border-t-gray-200">
            <p>TAGS AND CATEGORIES</p>
          </div>
        </div>

        {/* 그 밑에 박스 */}
        <div className="font-archivo text-foreground mt-8 flex flex-col text-xs leading-none font-bold tracking-[-0.03em] antialiased">
          <div className="grid grid-cols-2 gap-6 py-3">
            <div className="grid grid-cols-2">
              <h2 className="text-[23px] font-medium tracking-[-0.08em]">VISIBLE SCENE</h2>
              <div className="flex items-end justify-between">
                <p>LUCAS WITH WILSON</p>
                <p>2023</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 border-t-3 border-black py-3 dark:border-t-gray-200">
            <div className="grid grid-cols-2">
              <h2 className="text-[23px] font-medium tracking-[-0.08em]">STORIES</h2>
              <div className="flex items-end justify-between">
                <p>VITO BONAZI</p>
                <p>2021</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className="flex gap-[1px]">
                <div className="dark:bg-compWhite h-3.5 w-3.5 rounded-full bg-black" />
                <div className="h-3.5 w-3.5 rounded-full bg-red-600" />
              </span>
              <span className="flex gap-[1px]">
                <p className="border-foreground rounded-full border px-1">CREATIVE SCENE</p>
                <p className="border-foreground rounded-full border px-1">STUDIO VIDEO</p>
              </span>
            </div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative mt-4 h-90 overflow-hidden">
          {' '}
          {/* 컨테이너 */}
          <img
            // src={thumbnail || undefined}
            src="https://leetaesk-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/65e7bc3e-74a6-479a-aea5-d7e7bc3d80a5-blob"
            alt="최근 글 썸네일"
            className="animate-pan-vertical h-full w-full object-cover"
          />
          {/* 2. 상단 그라데이션 오버레이 */}
          <div
            className="dark:from-compDark pointer-events-none absolute inset-0 bg-gradient-to-b from-white from-0% to-transparent to-100%"
            aria-hidden="true"
          />
        </div>

        {/* 맨 아래 박스 */}
        <div className="font-archivo text-foreground mt-13 flex items-end justify-between border-t-3 border-black py-3 text-xs leading-none font-bold tracking-[-0.03em] antialiased dark:border-t-gray-200">
          <div className="max-w-2/3 break-words">
            A PLACE TO CREATE SPECIAL FILM SHOTS OR STUDIO PHOTOS WITH MULTIPLE LIGHTING SETTING.
            LARGE SURFACES PERFECT FOR YOUR OWN ARRANGEMENT. WAREHOUSE WITH NO LIMITS TO CREATE YOUR
            OWN FANTASY.
          </div>
          <span>[ VIEW DETAILS ]</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
