import axios, { type AxiosResponse } from 'axios';

import useUserStore from '@/store/useUserStore';

// baseUrl
const baseURL = import.meta.env.VITE_API_URL;

// Error 정규화 함수 => 훅에서 에러처리 편해짐
export const normalizeError = (error: any) => {
  // 커스텀 에러면 그대로 (서버 에러 dto말하는 거)
  if (error.isCustomError) {
    return Promise.reject(error);
  }

  // AxiosError인 경우
  if (error.response?.data) {
    const { message, code } = error.response.data;
    const customError = new Error(message || 'API Error');
    (customError as any).code = code || 'UNKNOWN_ERROR';
    (customError as any).status = error.response.status;
    return Promise.reject(customError);
  }

  return Promise.reject(error);
};

// http200, isSuccess:false일 경우(soft 200) 에러로 변환-> 훅에서 에러로 감지가능
const handleResponse = (response: AxiosResponse) => {
  if (response.data.isSuccess === false) {
    const error = new Error(response.data.message || 'API Error');
    (error as any).code = response.data.code;
    // 정규화 함수에서 중복 처리를 막기 위한 플래그
    (error as any).isCustomError = true;
    return Promise.reject(error);
  }
  return response;
};

// 로그인 불필요 API용 인스턴스
export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => handleResponse(response), // 성공 시 공통 로직 태우기 (soft fail 잡기)
  (error) => normalizeError(error), // 에러 발생 시 Error 정규화
);

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
  (response) => handleResponse(response),
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axiosInstance.post(
          '/api/auth/reissue',
          {},
          { withCredentials: true }, // config 객체를 세 번째 인자로 전달
        );

        const newAccessToken = response.data.result.accessToken;
        useUserStore.setState({ accessToken: newAccessToken });

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivateInstance(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().clearUser();
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return normalizeError(error);
  },
);
