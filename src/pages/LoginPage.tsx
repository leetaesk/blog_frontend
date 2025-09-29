// 카카오 로고 SVG 아이콘 컴포넌트
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import KakaoIcon from '@/assets/KakaoIcon.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleKakaoLogin = () => {
    // TODO: 추후 이곳에 카카오 로그인 리다이렉션 로직을 구현합니다.
    console.log('Redirect to Kakao login...');
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    // URL에서 'code' 파라미터 추출
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) alert(code);
  }, [navigate]);

  return (
    // 화면 전체를 덮는 배경 및 중앙 정렬 컨테이너
    <div className="bg-background flex h-screen items-center justify-center p-4">
      {/* 로그인 모달 컴포넌트 */}
      <div className="bg-compWhite dark:bg-compDark h-3/5 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl xl:max-w-6xl">
        <div className="flex h-full w-full flex-col md:flex-row">
          {/* 1. 좌측 섹션 (소개 문구) */}
          <div className="order-2 flex h-full flex-col justify-center border-r-2 border-gray-400 p-8 text-center md:order-1 md:w-1/2 md:p-12 lg:p-16">
            <div className="mx-auto max-w-md">
              <h2 className="text-foreground mb-4 text-3xl font-bold">
                Dive into the World of Code
              </h2>
              <p className="text-muted-foreground">
                지식을 공유하고, 성장의 여정을 기록하며, 동료 개발자들과 소통하세요. 당신의 위대한
                아이디어는 이곳에서 시작됩니다.
              </p>
            </div>
          </div>

          {/* 2. 우측 섹션 (로그인) */}
          <div className="order-1 flex flex-col items-center justify-center p-8 md:order-2 md:w-1/2 md:p-12 lg:p-16">
            <div className="w-full max-w-xs">
              <h1 className="text-foreground mb-4 text-center text-3xl font-bold tracking-tight">
                시작하기
              </h1>
              <p className="text-muted-foreground mb-8 text-center">
                소셜 계정으로 간편하게 시작하세요.
              </p>

              {/* 3. 카카오 로그인 버튼 */}
              <button
                onClick={handleKakaoLogin}
                className="focus:ring-offset-background flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#FEE500] px-4 py-3 text-base font-bold text-[#3A1D1D] transition-all hover:brightness-95 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
                type="button"
              >
                <img src={KakaoIcon} alt="카카오아이콘" />
                <span>카카오로 시작하기</span>
              </button>
              <p className="text-muted-foreground/80 mt-6 text-center text-xs">
                로그인은 개인정보보호정책 및 서비스 약관에 동의하는 것을 의미하며,
                <br />
                서비스 이용을 위해 이메일과 프로필 정보를 수집합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
