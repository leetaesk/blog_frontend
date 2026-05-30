import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ZodError } from 'zod';

import PostEditor from '@/components/PostEditor';
import ThumbnailInput from '@/components/ThumbnailInput';
import { urlFor } from '@/constants/routes';
import { useGetPostForEdit, useUpdatePost } from '@/features/posts/posts.hook';
import { postPostSchema } from '@/features/posts/posts.schema';
import CategoryInput from '@/ui/PostDetail/components/CategoryInput';

/**
 * 게시글 수정 페이지
 */
const UpdatePostPage = () => {
  const navigate = useNavigate();
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = parseInt(postIdStr || '', 10);

  const { data: post, isLoading, isError } = useGetPostForEdit({ postId });

  const { mutate: updatePost, isPending } = useUpdatePost();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [tagsInput, setTagsInput] = useState('');
  // 글 데이터가 비동기로 도착하면 PostEditor를 리마운트시켜 본문(HTML)을 주입하기 위한 key.
  // (PostEditor의 초기화는 최초 1회만 실행되므로, value가 빈값일 때 마운트되면 본문이 안 들어감)
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.categoryId || 0);
      setSummary(post.summary || '');
      setThumbnailUrl(post.thumbnailUrl || '');
      setTagsInput(post.tags.join(', '));
      setEditorKey((k) => k + 1); // 본문 HTML로 에디터 재초기화
    }
  }, [post]); // post 데이터가 변경될 때만 실행

  // --- 핸들러 ---
  const handleSave = () => {
    // 1. 태그 문자열을 배열로 파싱
    const tags: string[] | undefined = tagsInput.trim()
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0) // 빈 태그 제거
      : undefined;

    // 2. DTO 객체 구성
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

      // 훅 실행
      updatePost(
        { postId, ...validatedData },
        {
          onSuccess: (data) => {
            toast.success('게시글 수정이 완료되었습니다.');
            navigate(urlFor.postDetail(data.postId));
          },
          onError: (err) => {
            alert(`수정 실패: ${err.message}`);
          },
        },
      );
    } catch (error) {
      // 5. 유효성 검증 실패 시 에러 처리
      if (error instanceof ZodError) {
        const firstErrorMessage = error.message;
        toast.error('폼 데이터 검증 오류:', error.flatten().fieldErrors);
        alert(firstErrorMessage);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  // --- 로딩 및 에러 처리 ---
  if (isLoading) return <div>게시글 정보를 불러오는 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없거나 오류가 발생했습니다.</div>;

  // --- 렌더링 ---
  // PostNewPage와 동일한 UI를 반환합니다.
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
          게시글 수정하기 ✍️
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          기존 글을 수정하고 더 멋지게 완성해보세요.
        </p>
      </header>

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

        {/* 카테고리 */}
        <CategoryInput value={categoryId} onChange={setCategoryId} />

        {/* 요약 */}
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

        {/* 태그 */}
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
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted px-6 py-2 font-semibold transition-colors"
        >
          취소
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending} // ❗️ '수정' 요청이 진행 중일 때 비활성화
          className="rounded-lg-md bg-primary text-primary-foreground px-6 py-2 font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? '수정 중...' : '수정하기'}
        </button>
      </div>
    </div>
  );
};

export default UpdatePostPage;
