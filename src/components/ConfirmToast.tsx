import { useCallback, useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

// 반드시 react-dom에서 import!

// 1. 모달의 상태를 정의할 타입
interface ConfirmState {
  isOpen: boolean;
  message: string;
  confirmText: string;
  cancelText: string;
  resolver: ((value: boolean) => void) | null;
}

// 초기 상태
const initialState: ConfirmState = {
  isOpen: false,
  message: '',
  confirmText: '확인',
  cancelText: '취소',
  resolver: null,
};

// 2. 외부에서 사용할 함수 (이게 핵심)
let confirmFunction:
  | ((message: string, confirmText: string, cancelText: string) => Promise<boolean>)
  | null = null;

export const confirm = (
  message: string,
  confirmText: string = '확인',
  cancelText: string = '취소',
): Promise<boolean> => {
  if (!confirmFunction) {
    console.warn('GlobalConfirmModal is not mounted');
    return Promise.resolve(false);
  }
  return confirmFunction(message, confirmText, cancelText);
};

// 3. 앱 최상단에 배치할 컴포넌트
export const GlobalConfirmModal = () => {
  const [state, setState] = useState<ConfirmState>(initialState);

  // 컴포넌트가 마운트되면 confirmFunction을 이 컴포넌트의 setState와 연결
  useEffect(() => {
    confirmFunction = (message, confirmText, cancelText) => {
      return new Promise((resolve) => {
        setState({
          isOpen: true,
          message,
          confirmText,
          cancelText,
          resolver: resolve,
        });
      });
    };
  }, []);

  const handleClose = useCallback(
    (result: boolean) => {
      if (state.resolver) {
        state.resolver(result); // await 하고 있는 곳에 결과(true/false) 전달
      }
      setState(initialState); // 모달 초기화
    },
    [state.resolver],
  );

  // 모달이 닫혀있으면 렌더링 X
  if (!state.isOpen) return null;

  // React Portal을 사용하여 body 직속 자식으로 렌더링 (z-index 문제 해결)
  return createPortal(
    <div className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-200">
      {/* 배경 클릭 시 취소 처리 (원치 않으면 onClick 제거) */}
      <div className="absolute inset-0" onClick={() => handleClose(false)} />

      <div
        className="bg-compWhite dark:bg-compDark animate-in zoom-in-95 relative max-w-sm min-w-[320px] overflow-hidden rounded-2xl p-6 shadow-2xl duration-200"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <h3 className="text-foreground mb-2 text-lg font-bold">알림</h3>
        <p className="text-muted-foreground mb-6 text-sm whitespace-pre-wrap">{state.message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => handleClose(false)}
            className="rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {state.cancelText}
          </button>
          <button
            onClick={() => handleClose(true)}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500"
          >
            {state.confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
