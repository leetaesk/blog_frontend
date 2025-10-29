import axios from 'axios';

import useUserStore from '@/store/useUserStore';

// 제공해주신 스토어 경로
const baseURL = 'http://localhost:3000';

// 로그인 불필요 API용 인스턴스
export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// 로그인 필요 API용 인스턴스
export const axiosPrivateInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// 요청 인터셉터
axiosPrivateInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useUserStore.getState();
    if (accessToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터
axiosPrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post(
          '/api/auth/reissue',
          {}, // 1. 비어있는 body를 두 번째 인자로 전달
          { withCredentials: true }, // 2. config 객체를 세 번째 인자로 전달
        );

        const newAccessToken = response.data.result.accessToken;
        console.log('reissue: accessToken updated');
        // ❗️ 수정된 부분 1: setState를 사용하여 accessToken만 갱신합니다.
        // 이렇게 하면 기존의 다른 유저 정보(userId, userInfo)는 그대로 유지됩니다.
        useUserStore.setState({ accessToken: newAccessToken });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivateInstance(originalRequest);
      } catch (refreshError) {
        // ❗️ 수정된 부분 2: 스토어의 clearUser 액션을 호출합니다.
        console.error('Session expired. Please log in again.');
        useUserStore.getState().clearUser();

        // 로그인 페이지로 리디렉션
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
