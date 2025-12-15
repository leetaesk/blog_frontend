// src/Layout/GlobalLayout.tsx
import { useEffect } from 'react';

import ReactGA from 'react-ga4';
import { Outlet, useLocation } from 'react-router-dom';

const GlobalLayout = () => {
  const location = useLocation();

  // 1. GA 초기화
  useEffect(() => {
    const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    // 배포된 환경(production)이거나, ID가 있을 때만 실행
    const isProduction = import.meta.env.MODE === 'production';

    if (gaTrackingId && isProduction) {
      ReactGA.initialize(gaTrackingId);
    }
  }, []);

  // 2. 페이지 변경 감지
  useEffect(() => {
    if (ReactGA.isInitialized) {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      });
    }
  }, [location]);

  return <Outlet />;
};

export default GlobalLayout;
