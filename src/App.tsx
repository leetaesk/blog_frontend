import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import { ROUTES } from '@/constants/routes';
import ArchivePage from '@/pages/ArchivePage';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
// NotFoundPage는 그대로 사용합니다.
import PostDetailPage from '@/pages/PostDetailPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME, // '/'
    element: <Layout />,
    errorElement: <NotFoundPage />, // ✨ 1. 여기에 errorElement를 추가합니다.
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
      },
    ],
  },
  // 2. 기존의 path="*" 라우트는 이제 필요 없으므로 삭제합니다.
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
