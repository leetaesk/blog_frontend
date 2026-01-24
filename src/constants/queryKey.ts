import type {
  GetPostsLikedByMeRequestDto,
  GetPostsRequestDto,
} from '@/features/posts/archive/archive.dto';

export const QUERY_KEY = {
  posts: {
    ARCHIVE: (params: GetPostsRequestDto) => [
      'posts',
      params.limit,
      params.page,
      params.category,
      params.search,
    ],
    ARCHIVE_LIKED_BY_ME: (params: GetPostsLikedByMeRequestDto) => [
      'posts',
      'LikedByMe',
      params.limit,
      params.page,
      params.category,
      params.search,
    ],
    ALL: ['posts'],
    BY_POST_ID: (postId: number) => ['post', postId],
    FOR_EDIT: (postId: number) => ['post', 'edit', postId],
  },
  comments: {
    ALL: ['comments'],
    BY_POST_ID: (postId: number) => ['comments', postId],
    BY_ME: ['comments', 'byMe'],
  },
  category: {
    INDEX: ['categories'],
  },
};
