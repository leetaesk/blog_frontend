// import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from '@/App.tsx';
import '@/index.css';
import { queryClient } from '@/lib/react-query';

// 모니터링 도구는 배포(production) 환경에서만 동작시킨다. (로컬/개발 환경에선 비활성)
const isProduction = import.meta.env.MODE === 'production';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      {/* 메인 앱 */}
      <App />

      {/* 모니터링 도구들 (App과 형제 레벨 혹은 바로 아래에 위치) */}
      {isProduction && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
    </HelmetProvider>

    {/* DevTools는 QueryClientProvider 안에 있어야 작동함 */}
    <ReactQueryDevtools initialIsOpen={false} position="bottom" />
  </QueryClientProvider>,
  // </StrictMode>,
);
