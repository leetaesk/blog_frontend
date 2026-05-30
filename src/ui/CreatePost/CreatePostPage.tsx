import { useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';

import DraftListPanel from '@/components/DraftListPanel';
import PostEditor from '@/components/PostEditor';
import ThumbnailInput from '@/components/ThumbnailInput';
import type { DraftDetail } from '@/features/posts/posts.dto';
import { useDeleteDraft, usePostPost, useSaveDraft } from '@/features/posts/posts.hook';
import { postPostSchema } from '@/features/posts/posts.schema';
import CategoryInput from '@/ui/PostDetail/components/CategoryInput';

/** 쉼표 구분 태그 문자열을 배열로 파싱 */
const parseTags = (input: string): string[] =>
  input
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { mutate: createPost, isPending } = usePostPost();

  // 임시저장(서버) 관련
  const { mutate: saveDraft, isPending: isSavingDraft } = useSaveDraft();
  const { mutate: deleteDraft } = useDeleteDraft();
  // 현재 폼에 불러와 편집 중인 임시글 id (없으면 새 임시글로 저장)
  const [currentDraftId, setCurrentDraftId] = useState<number | null>(null);
  // 임시글을 불러올 때 PostEditor를 강제 리마운트시켜 새 본문으로 초기화하기 위한 key
  const [editorKey, setEditorKey] = useState(0);

  // DTO에 매핑되는 상태들
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');

  /** 임시글 목록에서 선택 → 폼에 불러오기 */
  const handleLoadDraft = (draft: DraftDetail) => {
    setTitle(draft.title || '');
    setContent(draft.content || '');
    setCategoryId(draft.categoryId || 0);
    setSummary(draft.summary || '');
    setThumbnailUrl(draft.thumbnailUrl || '');
    setTagsInput((draft.tags || []).join(', '));
    setCurrentDraftId(draft.id);
    setEditorKey((prev) => prev + 1); // 에디터 본문 갱신
    toast.success('임시저장된 글을 불러왔습니다.');
  };

  /** 임시글 삭제 (목록 패널에서) */
  const handleDeleteDraft = (draftId: number) => {
    deleteDraft(draftId, {
      onSuccess: () => {
        // 편집 중이던 임시글을 삭제했다면 연결 해제 (이후 저장 시 새로 생성)
        if (draftId === currentDraftId) setCurrentDraftId(null);
        toast.success('임시글을 삭제했습니다.');
      },
    });
  };

  /** '임시저장' 버튼 → 현재 폼 상태를 임시글로 저장(신규/수정) */
  const handleSaveDraft = () => {
    if (!title.trim() && !content.trim()) {
      toast.error('제목이나 본문을 입력한 뒤 임시저장할 수 있습니다.');
      return;
    }
    saveDraft(
      {
        draftId: currentDraftId,
        payload: {
          title,
          content,
          categoryId: categoryId || null,
          summary,
          thumbnailUrl,
          tags: parseTags(tagsInput),
        },
      },
      {
        onSuccess: (result) => {
          setCurrentDraftId(result.id);
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 화면 최상단으로 스크롤
          toast.success('임시저장되었습니다.');
        },
        onError: () => toast.error('임시저장에 실패했습니다.'),
      },
    );
  };

  const handleSave = () => {
    // 1. 태그 문자열을 배열로 파싱
    const parsedTags = parseTags(tagsInput);
    const tags: string[] | undefined = parsedTags.length > 0 ? parsedTags : undefined;

    // 2. DTO 객체 구성 (콘솔 출력용)
    const postData = {
      title: title.trim(),
      content: content?.trim(),
      ...(categoryId && { categoryId: Number(categoryId) }),
      ...(summary.trim() && { summary: summary.trim() }),
      ...(thumbnailUrl?.trim() && { thumbnailUrl: thumbnailUrl.trim() }),
      ...(tags && tags.length > 0 && { tags }),
    };

    try {
      // 3. Zod 스키마로 데이터 유효성 검증
      const validatedData = postPostSchema.parse(postData);

      // 4. 검증 통과 시, 서버에 데이터 전송. 발행 성공 시 연결된 임시글 삭제.
      createPost(validatedData, {
        onSuccess: () => {
          if (currentDraftId) deleteDraft(currentDraftId);
        },
      });
    } catch (error) {
      // 5. 유효성 검증 실패 시 에러 처리
      if (error instanceof ZodError) {
        // 첫 번째 에러 메시지를 사용자에게 보여줍니다.
        // const firstErrorMessage = error.errors[0].message;
        const firstErrorMessage = error.message;
        console.error('폼 데이터 검증 오류:', error.flatten().fieldErrors);
        alert(firstErrorMessage);
      } else {
        // Zod 에러가 아닌 다른 예기치 않은 에러 처리
        console.error('알 수 없는 오류 발생:', error);
        alert('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  /**
   * '취소' 버튼 클릭 시
   */
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 md:px-8">
      <header className="mb-8">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
          새 글 작성하기 ✍️
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          새로운 아이디어를 공유하고 멋진 글을 완성해보세요.
        </p>
      </header>

      {/* 임시저장 목록 - 선택해서 불러오기 */}
      <DraftListPanel
        currentDraftId={currentDraftId}
        onLoad={handleLoadDraft}
        onDelete={handleDeleteDraft}
      />

      <div className="space-y-6">
        {/* 제목 입력 필드 */}
        <div>
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring w-full border p-4 text-2xl font-semibold transition focus:ring-2 focus:outline-none"
          />
        </div>

        {/* 썸네일 (URL 직접 입력 또는 이미지 붙여넣기/업로드) */}
        <ThumbnailInput value={thumbnailUrl} onChange={setThumbnailUrl} />

        {/* 3. 🔽 카테고리 (categoryId) - 기존 select 로직을 통째로 교체 */}
        <CategoryInput value={categoryId} onChange={setCategoryId} />

        {/* 4. 요약 (summary) */}
        <div>
          <label htmlFor="summary" className="text-foreground mb-2 block text-lg font-semibold">
            요약
          </label>
          <textarea
            id="summary"
            placeholder="게시글 요약을 입력하세요. (검색 및 미리보기에 사용됩니다)"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring w-full border p-3 transition focus:ring-2 focus:outline-none"
          />
        </div>

        {/* 5. 태그 (tags) */}
        <div>
          <label htmlFor="tags" className="text-foreground mb-2 block text-lg font-semibold">
            태그
          </label>
          <input
            id="tags"
            type="text"
            placeholder="태그를 쉼표(,)로 구분하여 입력하세요"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring w-full border p-3 transition focus:ring-2 focus:outline-none"
          />
        </div>

        {/* 본문 에디터 (BlockNote - 노션 스타일) */}
        <div>
          <label className="text-foreground mb-2 block text-lg font-semibold">본문</label>
          <PostEditor key={editorKey} value={content} onChange={setContent} />
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-8 flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isSavingDraft}
          className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted mr-auto px-6 py-2 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSavingDraft ? '임시저장 중...' : currentDraftId ? '임시저장 갱신' : '임시저장'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted px-6 py-2 font-semibold transition-colors"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending} // 🔽 요청이 진행 중일 때 버튼 비활성화
          className="rounded-lg-md bg-primary text-primary-foreground px-6 py-2 font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
