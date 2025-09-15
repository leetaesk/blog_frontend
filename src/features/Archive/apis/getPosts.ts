import axios from 'axios';

import type {
  GetPostsRequestDto,
  GetPostsResponseDto,
  GetPostsResultType,
} from '../types/getPostsType';

/**
 * GET /api/posts API를 호출하는 함수
 * @param params page, limit, category를 포함하는 객체
 * @returns API 응답의 result 필드 (posts, pagination 포함)
 */
export const getPosts = async (params: GetPostsRequestDto): Promise<GetPostsResultType> => {
  // 백엔드 서버 주소 (환경 변수로 관리하는 것이 좋습니다)
  const API_BASE_URL = 'http://localhost:3000';

  const response = await axios.get<GetPostsResponseDto>(`${API_BASE_URL}/api/posts`, {
    params, // axios가 params 객체를 자동으로 쿼리 스트링으로 변환해줍니다. (예: ?page=1&limit=5)
  });

  // isSuccess가 true일 때만 result를 반환
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    // 서버에서 isSuccess가 false로 온 경우에 대한 에러 처리
    // (예: 커스텀 에러 객체를 던지거나, 기본값을 반환)
    throw new Error(`API Error: ${response.data.code} - ${response.data.message}`);
  }
};
