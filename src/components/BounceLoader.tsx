import React from 'react';

interface BounceLoaderProps {
  size?: number; // 로더 전체 크기 (px)
  duration?: number; // 애니메이션 시간 (초)
}

const BounceLoader = ({ size = 60, duration = 2 }: BounceLoaderProps) => {
  // 애니메이션과 관련된 스타일 (색상 제외)
  const commonAnimationStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    opacity: 0.6,
    animationName: 'bounce-animation',
    animationDuration: `${duration}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-[#111]/70"
      role="status"
      aria-live="polite"
    >
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* 첫 번째 원 */}
        <div
          className="bg-[#333333] dark:bg-white" // 라이트: --color-compDark, 다크: --color-textWhite
          style={{
            ...commonAnimationStyle,
          }}
        />
        {/* 두 번째 원 */}
        <div
          className="bg-[#333333] dark:bg-white"
          style={{
            ...commonAnimationStyle,
            animationDelay: `-${duration / 2}s`,
          }}
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// 캐싱
export default React.memo(BounceLoader);
