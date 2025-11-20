import { type Variants, motion } from 'framer-motion';

// 👈 Variants 타입을 import 합니다.

import { useGetPosts } from '@/features/posts/archive/archive.hook';

const HeroSection = () => {
  const { posts } = useGetPosts({ page: 1, limit: 1 });

  // --- ⬇️ 애니메이션 Variants 정의 ⬇️ ---
  /**
   * 자식 요소들을 순차적으로 실행시키는 컨테이너 Variant
   * delayChildren: 첫 번째 자식이 시작하기 전 딜레이
   * staggerChildren: 각 자식 사이의 딜레이
   */
  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // 부모는 보이게 두고, 자식들이 애니메이션을 처리
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2, // 0.2초 후 첫 번째 자식 애니메이션 시작
        staggerChildren: 0.15, // 0.15초 간격으로 다음 자식들 실행
      },
    },
  };

  /**
   * 개별 아이템이 아래에서 위로 올라오며 나타나는 Variant
   */
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 }, // 20px 아래 + 투명 상태
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }, // 0.5초 동안 부드럽게
    },
  };
  // --- ⬆️ 애니메이션 Variants 정의 ⬆️ ---

  if (!posts) return;
  return (
    <section className="flex w-full flex-col items-center px-6 md:px-12">
      {/* --- ⬇️ 최상위 컨테이너 ⬇️ --- */}
      {/* 기존 애니메이션 제거, containerVariants 적용 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* 히어로 텍스트 (블록 1) */}
        {/* ⬇️ motion.div로 변경 + itemVariants 적용 ⬇️ */}
        <motion.div
          variants={itemVariants}
          className="mb-10 border-t-3 border-black py-10 dark:border-t-gray-200"
        >
          <h1 className="font-archivo text-foreground mb-4 w-full text-right text-7xl leading-none font-normal tracking-[-0.08em] sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem]">
            ARCHIVE
          </h1>
        </motion.div>

        {/* 밑에 박스 두개 (블록 2) */}
        {/* ⬇️ motion.div로 변경 + containerVariants 적용 (중첩) ⬇️ */}
        <motion.div
          variants={containerVariants} // 이 컨테이너가 실행될 때, 자식들을 다시 stagger 함
          className="font-archivo text-foreground grid grid-cols-2 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased"
        >
          {/* ⬇️ itemVariants 적용 (왼쪽 박스) ⬇️ */}
          <motion.div
            variants={itemVariants}
            className="border-b-foreground/30 grid grid-cols-2 gap-6 border-t-3 border-b border-black py-2 text-left dark:border-t-gray-200"
          >
            <div>
              <p>
                CINEMATOGRAPHY <br />
                LATEST PRODUCTION
              </p>
            </div>
            <div>
              <p>DEVELOPER</p>
            </div>
          </motion.div>
          {/* ⬇️ itemVariants 적용 (오른쪽 박스) ⬇️ */}
          <motion.div
            variants={itemVariants}
            className="border-b-foreground/30 border-t-3 border-b border-black py-2 text-right dark:border-t-gray-200"
          >
            <p>TAGS AND CATEGORIES</p>
          </motion.div>
        </motion.div>

        {/* 그 밑에 박스 (블록 3) */}
        {/* ⬇️ motion.div로 변경 + containerVariants 적용 (중첩) ⬇️ */}
        <motion.div
          variants={containerVariants} // 이 컨테이너가 실행될 때, 자식들을 다시 stagger 함
          className="font-archivo text-foreground mt-8 flex flex-col text-xs leading-none font-bold tracking-[-0.03em] antialiased"
        >
          {/* ⬇️ itemVariants 적용 (첫 번째 줄) ⬇️ */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 py-3">
            <div className="grid grid-cols-2">
              <h2 className="text-[23px] font-medium tracking-[-0.08em]">VISIBLE SCENE</h2>
              <div className="flex items-end justify-between">
                <p>LUCAS WITH WILSON</p>
                <p>2023</p>
              </div>
            </div>
          </motion.div>
          {/* ⬇️ itemVariants 적용 (두 번째 줄) ⬇️ */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6 border-t-3 border-black py-3 dark:border-t-gray-200"
          >
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
          </motion.div>
        </motion.div>

        {/* 이미지 (블록 4) */}
        {/* ⬇️ motion.div로 변경 + itemVariants 적용 ⬇️ */}
        <motion.div variants={itemVariants} className="relative mt-4 h-90 overflow-hidden">
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white from-0% to-transparent to-100% dark:from-[#262626]"
            aria-hidden="true"
          />
        </motion.div>

        {/* 맨 아래 박스 (블록 5) */}
        {/* ⬇️ motion.div로 변경 + itemVariants 적용 ⬇️ */}
        <motion.div
          variants={itemVariants}
          className="font-archivo text-foreground mt-13 flex items-end justify-between border-t-3 border-black py-3 text-xs leading-none font-bold tracking-[-0.03em] antialiased dark:border-t-gray-200"
        >
          <div className="max-w-2/3 break-words">
            A PLACE TO CREATE SPECIAL FILM SHOTS OR STUDIO PHOTOS WITH MULTIPLE LIGHTING SETTING.
            LARGE SURFACES PERFECT FOR YOUR OWN ARRANGEMENT. WAREHOUSE WITH NO LIMITS TO CREATE YOUR
            OWN FANTASY.
          </div>
          <span>[ VIEW DETAILS ]</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
