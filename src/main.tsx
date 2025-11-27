// import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';

import App from '@/App.tsx';
import '@/index.css';
import { queryClient } from '@/lib/react-query';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* <StrictMode> */}
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
    {/* </StrictMode> */}
  </QueryClientProvider>,
);
