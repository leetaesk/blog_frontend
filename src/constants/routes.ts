export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ARCHIVE: '/archive',
  MYPAGE: '/my',
  POSTS: '/posts',
  POST_DETAIL: '/posts/:postId',
  POST_CREATE: '/posts/create',
  POST_UPDATE: '/posts/:postId/update',
};

export const urlFor = {
  archive: (category?: string) => (category ? `/archive?category=${category}` : `/archive`),
  postDetail: (postId: number) => `/posts/${postId}`,
  editPost: (postId: number) => `/posts/${postId}/edit`,
};
