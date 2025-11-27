import { redirect } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import useUserStore from '@/store/useUserStore';

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
 * 게스트(guest)만 접근을 허용하는 loader.
 */
export const isGuestLoader = () => {
  const { userInfo } = useUserStore.getState();

  if (userInfo) {
    alert('이미 로그인하셨다면, 접근하실 수 없습니다.');
    return redirect('/');
  }
  return null;
};

/**
 * 로그인 안했음 컷
 */
export const isLoginLoader = () => {
  const { userInfo } = useUserStore.getState();

  if (!userInfo) {
    alert('로그인이 필요한 페이지입니다.');
    return redirect(ROUTES.LOGIN);
  }

  return null;
};
