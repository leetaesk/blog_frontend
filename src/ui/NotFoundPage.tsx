import { Link } from 'react-router-dom';

import FuzzyText from '@/components/FuzzyText';

const NotFoundPage = () => {
  return (
    <div className="bg-compDark flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-[70vw] max-w-[800px] justify-center">
        <FuzzyText
          baseIntensity={0.3}
          hoverIntensity={0.5}
          enableHover={true}
          // 이제 너비는 부모 div가 제어하므로, 폰트 크기만 적절히 조절합니다.
          fontSize="clamp(5rem, 18vw, 15rem)"
        >
          404
        </FuzzyText>
      </div>

      <div className="mt-6 flex w-[70vw] max-w-[800px] justify-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          fontSize="clamp(2rem, 8vw, 5rem)"
        >
          Not Found
        </FuzzyText>
      </div>

      {/* 메인으로 돌아가기 버튼 */}
      <Link
        to="/"
        className="focus:ring-offset-bgDark mt-16 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
