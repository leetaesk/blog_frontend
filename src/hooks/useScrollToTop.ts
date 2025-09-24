import { useEffect } from 'react';

/**
 * 지정한 trigger 값이 바뀔 때마다 브라우저 화면을 최상단으로 부드럽게 이동시킨다.
 * @param trigger 스크롤을 일으킬 의존성 값 (예: pathname, page 등)
 */
const useScrollToTop = (trigger: unknown) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [trigger]);
};

export default useScrollToTop;
