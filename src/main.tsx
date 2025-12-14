// import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import '@/index.css';
import { queryClient } from '@/lib/react-query';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <StrictMode> */}
    <App />
    <SpeedInsights />
    <Analytics />
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </StrictMode> */}
  </QueryClientProvider>,
);
