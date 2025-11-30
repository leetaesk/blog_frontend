import { type Variants, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { ROUTES } from '@/constants/routes';

const HeroSection = () => {
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
        delayChildren: 0, // 0.2초 후 첫 번째 자식 애니메이션 시작 -> 느려보여서 0으로 변경
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
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  /**
   * 화살표가 모든 로딩이 끝난 후 혼자 통통 튀는 Variant
   */
  const arrowVariants: Variants = {
    hidden: { x: 0, opacity: 1 },
    visible: {
      x: [0, 6, 0, 4, 0], // 0 -> 6px -> 0 -> 3px -> 0 (두 번 튕김)
      transition: {
        delay: 2.0, // 앞선 요소들이 다 나타날 때까지 대기 : 2초
        duration: 1.2,
        times: [0, 0.3, 0.5, 0.8, 1], // 각 움직임의 타이밍 배분
        ease: 'easeInOut', // 부드럽게
      },
    },
  };
  // ---  애니메이션 Variants 정의  ---

  return (
    <section className="flex w-full flex-col items-center">
      {/* --- 최상위 컨테이너 --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* 히어로 텍스트 (블록 1) */}
        <motion.div
          variants={itemVariants}
          className="mb-3 border-t-3 border-black py-10 md:mb-10 dark:border-t-gray-200"
        >
          <h1 className="font-archivo text-foreground mb-4 w-full text-right text-[5.25rem] leading-none font-normal tracking-[-0.08em] sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem]">
            ARCHIVE
          </h1>
        </motion.div>

        {/* 밑에 박스 두개 (블록 2) */}
        <motion.div
          variants={containerVariants}
          className="font-archivo text-foreground grid grid-cols-2 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased"
        >
          {/* itemVariants 적용 (왼쪽 박스) */}
          <motion.div
            variants={itemVariants}
            className="border-b-foreground/30 flex flex-col gap-6 border-t-3 border-b border-black py-2 text-left sm:grid sm:grid-cols-2 dark:border-t-gray-200"
          >
            {/* 640~645에서만 깨져서 min-w 걸어서 깨짐 방지함 */}
            <div className="flex min-w-[129.5px] items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  src="https://leetaesk-blog-bucket.s3.ap-northeast-2.amazonaws.com/images/1f549bcc-d83b-44f2-b19b-77e5e5628672-blob"
                  alt="이태석"
                />
              </div>
              <p className="text-base font-bold lg:text-xl">LEE TAESEOK</p>
            </div>
            <Link to={ROUTES.ABOUTME} className="group flex h-4 items-center hover:underline">
              ABOUT ME
              <motion.div variants={arrowVariants}>
                <ArrowRightIcon className="h-4 w-4" />
              </motion.div>
            </Link>
          </motion.div>
          {/* itemVariants 적용 (오른쪽 박스) */}
          <motion.div
            variants={itemVariants}
            className="border-b-foreground/30 border-t-3 border-b border-black py-2 text-right dark:border-t-gray-200"
          >
            <p className="mt-2 sm:mt-0">FRONTEND DEVELOPER</p>
          </motion.div>
        </motion.div>

        {/* 그 밑에 박스 (블록 3) */}
        <motion.div
          variants={containerVariants}
          className="font-archivo text-foreground mt-8 flex flex-col text-xs leading-none font-bold tracking-[-0.03em] antialiased"
        >
          {/* itemVariants 적용 (첫 번째 줄) */}
          <motion.div variants={itemVariants} className="gap-6 py-3 sm:grid sm:grid-cols-2">
            <div className="grid grid-cols-2">
              <h2 className="text-[1.4375rem] font-medium tracking-[-0.08em]">VISIBLE SCENE</h2>
              <div className="flex items-end justify-between">
                <p>LUCAS WITH WILSON</p>
                <p>2023</p>
              </div>
            </div>
          </motion.div>
          {/* itemVariants 적용 (두 번째 줄) */}
          <motion.div
            variants={itemVariants}
            className="border-t-3 border-black py-3 sm:grid sm:grid-cols-2 sm:gap-6 dark:border-t-gray-200"
          >
            <div className="grid grid-cols-2">
              <h2 className="text-[23px] font-medium tracking-[-0.08em]">STORIES</h2>
              {/* STUDIO ALL에 맞춰서 하드코딩함 - 텍스트 바뀌면 바꿔야 함 ㅋㅋ 이럴거면 grid-4로 해 아 안되는구나 */}
              <div className="flex items-end justify-end gap-14 sm:justify-between sm:gap-0">
                <p>VITO BONAZI</p>
                <p>2021</p>
              </div>
            </div>
            <div className="mt-1 flex items-end justify-between sm:mt-0">
              <span className="flex gap-[1px]">
                <div className="dark:bg-compWhite h-3.5 w-3.5 rounded-full bg-black" />
                <div className="h-3.5 w-3.5 rounded-full bg-red-600" />
              </span>
              <span className="flex gap-[1px]">
                <p className="border-foreground rounded-full border px-1">CREATIVE SCENE</p>
                <p className="border-foreground rounded-full border px-1">STUDIO ALL</p>
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* 이미지 (블록 4) */}
        <motion.div variants={itemVariants} className="relative mt-4 h-50 overflow-hidden md:h-90">
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
        <motion.div
          variants={itemVariants}
          className="font-archivo text-foreground mt-13 flex items-end justify-between border-t-3 border-black py-3 text-xs leading-none font-bold tracking-[-0.03em] antialiased dark:border-t-gray-200"
        >
          <div className="max-w-2/3 break-words">
            A PLACE TO ARCHIVE MY CODE AND DEVELOPMENT JOURNEY. DESIGN CONCEPT INSPIRED BY ARCHIVE -
            WEBSITE CONCEPT BY TOMASZ MAZURCZAK ON DRIBBBLE.
          </div>
          <span>[ VIEW STORIES ]</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
