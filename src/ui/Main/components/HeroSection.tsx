import { motion } from 'framer-motion';

import { useGetPosts } from '@/features/posts/archive/archive.hook';

const HeroSection = () => {
  const { posts } = useGetPosts({ page: 1, limit: 1 });
  if (!posts) return;
  return (
    <section className="flex flex-col items-center w-full min-h-screen px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        {/* 히어로 텍스트 */}
        <div className="py-10 mb-10 border-black border-t-3 dark:border-t-gray-200">
          <h1 className="font-archivo text-foreground mb-4 w-full text-right text-7xl leading-none font-normal tracking-[-0.08em] sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem]">
            ARCHIVE
          </h1>
        </div>

        {/* 밑에 박스 두개 */}
        <div className="font-archivo text-foreground grid grid-cols-2 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased">
          <div className="grid grid-cols-2 gap-6 py-2 text-left border-b border-black border-b-foreground/30 border-t-3 dark:border-t-gray-200">
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
          <div className="py-2 text-right border-b border-black border-b-foreground/30 border-t-3 dark:border-t-gray-200">
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
          <div className="grid grid-cols-2 gap-6 py-3 border-black border-t-3 dark:border-t-gray-200">
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
                <p className="px-1 border rounded-full border-foreground">CREATIVE SCENE</p>
                <p className="px-1 border rounded-full border-foreground">STUDIO VIDEO</p>
              </span>
            </div>
          </div>
        </div>

        {/* 이미지 */}
        <div className="relative mt-4 overflow-hidden h-90">
          {' '}
          {/* 컨테이너 */}
          <img
            // src={thumbnail || undefined}
            src="https://leetaesk-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/65e7bc3e-74a6-479a-aea5-d7e7bc3d80a5-blob"
            alt="최근 글 썸네일"
            className="object-cover w-full h-full animate-pan-vertical"
          />
          {/* 2. 상단 그라데이션 오버레이 */}
          <div
            className="dark:from-compDark pointer-events-none absolute inset-0 bg-gradient-to-b from-white from-0% to-transparent to-100%"
            aria-hidden="true"
          />
        </div>

        {/* 맨 아래 박스 */}
        <div className="font-archivo text-foreground mt-13 flex items-end justify-between border-t-3 border-black py-3 text-xs leading-none font-bold tracking-[-0.03em] antialiased dark:border-t-gray-200">
          <div className="break-words max-w-2/3">
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
