import { redirect } from 'react-router-dom';

import useUserStore from '@/store/useUserStore';

// 블로그의 유저 스토어

/**
 * 관리자(admin)만 접근을 허용하는 loader.
 */
export const isAdminLoader = () => {
  const { userInfo } = useUserStore.getState();

  if (userInfo?.role !== 'admin') {
    alert('접근 권한이 없습니다.');
    return redirect('/');
  }

  return null;
};

/**
 * 게스트(guest)만 접근을 허용하는 loader. (로그인한 유저는 접근 불가)
 */
export const isGuestLoader = () => {
  const { userInfo } = useUserStore.getState();

  // 로그인한 유저('user' 또는 'admin')라면 홈으로 보냅니다.
  if (userInfo) {
    return redirect('/');
  }
  return null;
};
