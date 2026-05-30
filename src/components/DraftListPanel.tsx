import { useState } from 'react';

import { useGetDrafts } from '@/features/posts/posts.hook';
import type { DraftDetail } from '@/features/posts/posts.dto';

interface DraftListPanelProps {
  /** 현재 폼에 불러와 편집 중인 임시글 id (강조 표시용) */
  currentDraftId: number | null;
  /** 임시글 선택 시 → 폼에 불러오기 */
  onLoad: (draft: DraftDetail) => void;
  /** 임시글 삭제 시 */
  onDelete: (draftId: number) => void;
}

/**
 * 작성 페이지 상단의 임시저장 목록 패널.
 * 토글을 열면 저장된 임시글들을 보여주고, 선택해서 불러오거나 삭제할 수 있다.
 */
const DraftListPanel = ({ currentDraftId, onLoad, onDelete }: DraftListPanelProps) => {
  const [open, setOpen] = useState(false);
  const { data: drafts = [], isLoading } = useGetDrafts();

  return (
    <div className="border-border bg-card mb-6 rounded-lg-md border">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="text-foreground flex w-full items-center justify-between px-4 py-3 font-semibold"
      >
        <span>📝 임시저장 불러오기 ({drafts.length})</span>
        <span className="text-muted-foreground text-sm">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="border-border border-t px-4 py-3">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">불러오는 중...</p>
          ) : drafts.length === 0 ? (
            <p className="text-muted-foreground text-sm">저장된 임시글이 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {drafts.map((draft) => (
                <li
                  key={draft.id}
                  className={`flex items-center justify-between gap-3 rounded-md border p-3 transition ${
                    draft.id === currentDraftId
                      ? 'border-primary bg-muted'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate font-medium">
                      {draft.title.trim() || '(제목 없음)'}
                    </p>
                    <p className="text-muted-foreground text-xs">{draft.updatedAt}</p>
                  </div>
                  <div className="flex flex-shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onLoad(draft);
                        setOpen(false);
                      }}
                      className="rounded-md bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold transition hover:opacity-90"
                    >
                      불러오기
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(draft.id)}
                      className="rounded-md border border-red-400 px-3 py-1 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DraftListPanel;
