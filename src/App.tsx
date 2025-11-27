import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { GlobalConfirmModal } from '@/components/ConfirmToast';
import { ROUTES } from '@/constants/routes';
import { getPostByIdLoader } from '@/features/posts/posts.loader';
import { queryClient } from '@/lib/react-query';
import AboutMePage from '@/ui/AboutMe/AboutMePage';
import ArchivePage from '@/ui/Archive/ArchivePage';
import CreatePostPage from '@/ui/CreatePost/CreatePostPage';
import LoginPage from '@/ui/Login/LoginPage';
import MainPage from '@/ui/Main/MainPage';
import MyPage from '@/ui/Mypage/MyPage';
import NotFoundPage from '@/ui/NotFoundPage';
import PostDetailPage from '@/ui/PostDetail/PostDetailPage';
import UpdatePostPage from '@/ui/UpdatePost/UpdatePostPage';
import { isAdminLoader, isGuestLoader, isLoginLoader } from '@/utils/userRoleLoader';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME, // '/'
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.ABOUTME,
        element: <AboutMePage />,
      },
      {
        path: ROUTES.ARCHIVE, // '/archive'
        element: <ArchivePage />,
      },
      {
        path: ROUTES.POST_DETAIL, // '/posts/:postId'
        element: <PostDetailPage />,
        loader: getPostByIdLoader(queryClient),
      },
      {
        path: ROUTES.POST_CREATE, // '/posts/create'
        element: <CreatePostPage />,
        loader: isAdminLoader,
      },
      {
        path: ROUTES.POST_UPDATE, // '/posts/:postId/update'
        element: <UpdatePostPage />,
        loader: isAdminLoader,
      },
      {
        path: ROUTES.MYPAGE,
        element: <MyPage />,
        loader: isLoginLoader,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    loader: isGuestLoader,
    errorElement: <NotFoundPage />,
  },
]);

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <h2 className="text-xl font-bold text-red-600">오류가 발생했습니다!</h2>
    <p className="mb-4 text-gray-500">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      다시 시도
    </button>
  </div>
);

function App() {
  return (
    // 1. React Query 에러 재설정 경계
    <QueryErrorResetBoundary>
      {({ reset }) => (
        // 2. UI 에러 경계 (치명적인 에러는 여기서 잡힘)
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          {/* 기존 라우터나 메인 컴포넌트 */}
          <RouterProvider router={router} />

          {/* 전역 토스트 위치 (react-hot-toast) */}
          <Toaster position="top-center" />
          <GlobalConfirmModal />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
