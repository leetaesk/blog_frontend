import { QueryClient } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { ROUTES } from '@/constants/routes';
import { getPostByIdLoader } from '@/features/Post/loaders/getPostByIdLoader';
import ArchivePage from '@/pages/ArchivePage';
import LoginPage from '@/pages/LoginPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PostDetailPage from '@/pages/PostDetailPage';
import PostNewPage from '@/pages/PostNewPage';

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
