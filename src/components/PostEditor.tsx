import { useCallback, useEffect, useRef } from 'react';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

import { useUploadImage } from '@/features/images/images.hook';
import { compressImage } from '@/features/images/images.util';
import useThemeStore from '@/store/themeStore';

interface PostEditorProps {
  /** 초기 본문 (HTML). 최초 마운트 시 1회만 에디터에 반영됩니다. */
  value: string;
  /** 본문이 바뀔 때마다 직렬화된 HTML을 전달합니다. */
  onChange: (html: string) => void;
}

/**
 * BlockNote 기반 노션 스타일 에디터.
 * - 슬래시(/) 메뉴, 블록 드래그, 이미지 클립보드 붙여넣기 지원
 * - 저장 포맷은 HTML (조회 페이지의 prose 렌더링과 호환)
 * - 이미지는 기존 압축 + S3 업로드 파이프라인을 재사용
 */
const PostEditor = ({ value, onChange }: PostEditorProps) => {
  const currentTheme = useThemeStore((s) => s.theme);
  const { mutateAsync: uploadImageAsync } = useUploadImage();

  // BlockNote 에디터가 파일을 받으면: 압축 → S3 업로드 → 반환된 URL을 이미지 블록에 사용
  const uploadFile = useCallback(
    async (file: File) => {
      const compressed = file.type.startsWith('image/') ? await compressImage(file) : file;
      return await uploadImageAsync(compressed);
    },
    [uploadImageAsync],
  );

  const editor = useCreateBlockNote({ uploadFile });

  // 최초 1회: 전달받은 HTML을 블록으로 파싱해 에디터에 주입
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    let cancelled = false;
    (async () => {
      if (!value || !value.trim()) return;
      const blocks = await editor.tryParseHTMLToBlocks(value);
      if (!cancelled) editor.replaceBlocks(editor.document, blocks);
    })();

    return () => {
      cancelled = true;
    };
  }, [editor, value]);

  // 내용 변경 시 HTML로 직렬화해 상위로 전달
  const handleChange = useCallback(async () => {
    const html = await editor.blocksToHTMLLossy(editor.document);
    onChange(html);
  }, [editor, onChange]);

  return (
    <div className="rounded-lg-md border-border bg-card overflow-hidden border">
      <BlockNoteView
        editor={editor}
        onChange={handleChange}
        theme={currentTheme === 'dark' ? 'dark' : 'light'}
        className="min-h-[600px] py-4"
      />
    </div>
  );
};

export default PostEditor;
