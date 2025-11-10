import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { ROUTES } from '@/constants/routes';
import { getPostByIdLoader } from '@/features/posts/posts.loader';
import ArchivePage from '@/ui/Archive/ArchivePage';
import CreatePostPage from '@/ui/CreatePost/CreatePostPage';
import LoginPage from '@/ui/Login/LoginPage';
import MainPage from '@/ui/Main/MainPage';
import MyPage from '@/ui/Mypage/MyPage';
import NotFoundPage from '@/ui/NotFoundPage';
import PostDetailPage from '@/ui/PostDetail/PostDetailPage';
import UpdatePostPage from '@/ui/UpdatePost/EditPostPage';
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
