import { Link } from 'react-router-dom';

import FuzzyText from '@/components/FuzzyText';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-compDark">
      {/* 두 컴포넌트를 감싸는 div에 동일한 너비를 지정합니다.
        w-[70vw]는 화면 너비의 70%를 사용하라는 의미입니다.
        max-w-[800px]는 너비가 800px 이상으로는 커지지 않게 막아줍니다.
      */}
      <div className="w-[70vw] max-w-[800px] flex justify-center">
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

      <div className="mt-6 w-[70vw] max-w-[800px] flex justify-center">
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
        className="mt-16 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-bgDark"
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
