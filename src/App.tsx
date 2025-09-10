import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { ROUTES } from '@/constants/routes';
import ArchivePage from '@/pages/ArchivePage';
import MainPage from '@/pages/MainPage';
import PostDetailPage from '@/pages/PostDetailPage';

// 1. 상세 페이지 컴포넌트 import

const router = createBrowserRouter([
  {
    path: ROUTES.HOME, // '/'
    element: <Layout />,
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
        path: ROUTES.POST_DETAIL, // '/posts/:postId'  2. 상세 페이지 라우트 추가
        element: <PostDetailPage />,
      },
    ],
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
