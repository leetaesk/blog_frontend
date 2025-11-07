import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { ROUTES } from '@/constants/routes';
import { getPostByIdLoader } from '@/features/posts/posts.loader';
import ArchivePage from '@/ui/Archive/ArchivePage';
import PostNewPage from '@/ui/CreatePost/PostNewPage';
import LoginPage from '@/ui/Login/LoginPage';
import MainPage from '@/ui/Main/MainPage';
import MyPage from '@/ui/Mypage/MyPage';
import NotFoundPage from '@/ui/NotFoundPage';
import PostDetailPage from '@/ui/PostDetail/PostDetailPage';
import EditPostPage from '@/ui/UpdatePost/EditPostPage';
import { isAdminLoader, isGuestLoader } from '@/utils/userRoleLoader';

const queryClient = new QueryClient();

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
        path: ROUTES.ARCHIVE, // '/archive'
        element: <ArchivePage />,
      },
      {
        path: ROUTES.POST_DETAIL, // '/posts/:postId'
        element: <PostDetailPage />,
        loader: getPostByIdLoader(queryClient),
      },
      {
        path: ROUTES.POST_NEW,
        element: <PostNewPage />,
        loader: isAdminLoader,
      },
      {
        path: ROUTES.POST_EDIT, // '/posts/:postId/edit'
        element: <EditPostPage />,
        // 1. 페이지 렌더링 전, 폼에 채울 게시글 데이터를 미리 불러옵니다.
        // 2. 동시에 관리자(글쓴이)가 맞는지 권한을 확인합니다.
        // loader: async (args) => {
        //   await isAdminLoader(args); // 권한 먼저 체크
        //   return getPostByIdLoader(queryClient)(args); // 권한 통과 시 데이터 로드
        // },
      },
      {
        path: ROUTES.MYPAGE,
        element: <MyPage />,
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
