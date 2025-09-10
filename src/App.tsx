import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '@/Layout/Layout';
import ArchivePage from '@/pages/ArchivePage';
import MainPage from '@/pages/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'archive', // 'localhost:5173/blog' 경로
        element: <ArchivePage />,
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
