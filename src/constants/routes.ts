export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  ARCHIVE: '/archive',
  POSTS: '/posts',
  POST_DETAIL: '/posts/:postId', // ':postId'는 URL 파라미터를 의미하는 동적 세그먼트입니다.
};

export const urlFor = {
  archive: (category?: string) => (category ? `/archive?category=${category}` : `/archive`),
  postDetail: (postId: number) => `/posts/${postId}`,
};
