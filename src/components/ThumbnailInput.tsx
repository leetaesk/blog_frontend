import { type ChangeEvent, type ClipboardEvent, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { useUploadImage } from '@/features/images/images.hook';
import { compressImage } from '@/features/images/images.util';

interface ThumbnailInputProps {
  /** 현재 썸네일 URL */
  value: string;
  /** URL이 바뀔 때 호출 (직접 입력 또는 업로드 완료 시) */
  onChange: (url: string) => void;
}

/**
 * 썸네일 입력 필드.
 * - URL 직접 입력
 * - 클립보드 이미지 붙여넣기(Ctrl+V) → 압축 + S3 업로드 → URL 자동 설정
 * - 파일 선택 업로드
 */
const ThumbnailInput = ({ value, onChange }: ThumbnailInputProps) => {
  const { mutate, isPending } = useUploadImage();
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const busy = isCompressing || isPending;

  /** 압축 후 업로드, 성공 시 URL 반영 */
  const processAndUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드할 수 있습니다.');
      return;
    }
    setIsCompressing(true);
    try {
      const compressed = await compressImage(file);
      mutate(compressed, {
        onSuccess: (url) => {
          onChange(url);
          toast.success('썸네일이 업로드되었습니다.');
        },
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? `압축 실패: ${error.message}` : '압축 중 오류가 발생했습니다.',
      );
    } finally {
      setIsCompressing(false);
    }
  };

  /** 클립보드에 이미지 파일이 있으면 업로드, URL 텍스트면 기본 붙여넣기 유지 */
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file' && items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processAndUpload(file);
          event.preventDefault();
          return;
        }
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processAndUpload(file);
      event.target.value = '';
    }
  };

  return (
    <div>
      <label htmlFor="thumbnailUrl" className="text-foreground mb-2 block text-lg font-semibold">
        썸네일
      </label>

      <div className="flex gap-2">
        <input
          id="thumbnailUrl"
          type="text"
          placeholder="URL 직접 입력 또는 이미지 복사 후 여기에 붙여넣기 (Ctrl+V)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring w-full border p-3 transition focus:ring-2 focus:outline-none"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="썸네일 이미지 선택"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={busy}
          className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted flex-shrink-0 px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? '업로드 중...' : '이미지 업로드'}
        </button>
      </div>

      {value && (
        <div className="mt-4">
          <p className="text-muted-foreground mb-2 text-sm">이미지 미리보기:</p>
          <div className="h-48 w-72 overflow-hidden">
            <img
              src={value}
              alt="썸네일 미리보기"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              onLoad={(e) => (e.currentTarget.style.display = 'block')}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailInput;
