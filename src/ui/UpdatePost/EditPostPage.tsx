import { useEffect, useState } from 'react';

import MDEditor from '@uiw/react-md-editor';
import { useNavigate, useParams } from 'react-router-dom';
import { ZodError } from 'zod';

import ImageUploader from '@/components/ImageUploader';
import { urlFor } from '@/constants/routes';
import { useGetPostForEdit, useUpdatePost } from '@/features/posts/posts.hook';
import { postPostSchema } from '@/features/posts/posts.schema';
import useThemeStore from '@/store/themeStore';
import CategoryInput from '@/ui/PostDetail/components/CategoryInput';

const UpdatePostPage = () => {
  const navigate = useNavigate();
  const { postId: postIdStr } = useParams<{ postId: string }>();
  const postId = parseInt(postIdStr || '', 10);

  const currentTheme = useThemeStore((s) => s.theme);

  // --- 데이터 페칭 ---
  // 1. 수정할 게시글의 원본 데이터를 가져옵니다.
  const {
    data: post,
    isLoading: isFetching, // ❗️ 로딩 상태
    isError, // ❗️ 에러 상태
  } = useGetPostForEdit({ postId });

  // --- 뮤테이션 ---
  // 2. 게시글 수정을 위한 mutation 훅을 가져옵니다.
  const { mutate: updatePost, isPending } = useUpdatePost();

  // --- 상태 관리 ---
  // PostNewPage와 동일한 상태들을 선언합니다.
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [tagsInput, setTagsInput] = useState('');

  // ❗️ 3. (가장 중요) 데이터 로딩이 완료되면, 폼 상태를 초기화합니다.
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.categoryId || 0);
      setSummary(post.summary || '');
      setThumbnailUrl(post.thumbnailUrl || '');
      setTagsInput(post.tags.join(', '));
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

      // ❗️ 4. 검증 통과 시, '수정' 뮤테이션 함수 호출
      updatePost(
        { postId, ...validatedData },
        {
          onSuccess: (data) => {
            // ❗️ 훅에 정의된 onSuccess(archive로 이동)를 덮어쓰고
            // ❗️ 수정된 상세 페이지로 이동합니다.
            navigate(urlFor.postDetail(data.postId));
          },
          onError: () => {
            // 훅에 이미 alert가 정의되어 있습니다.
          },
        },
      );
    } catch (error) {
      // 5. 유효성 검증 실패 시 에러 처리
      if (error instanceof ZodError) {
        const firstErrorMessage = error.message;
        console.error('폼 데이터 검증 오류:', error.flatten().fieldErrors);
        alert(firstErrorMessage);
      } else {
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

  // --- 로딩 및 에러 처리 ---
  if (isFetching) return <div>게시글 정보를 불러오는 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없거나 오류가 발생했습니다.</div>;

  // --- 렌더링 ---
  // PostNewPage와 동일한 UI를 반환합니다.
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
          게시글 수정하기 ✍️
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          기존 글을 수정하고 더 멋지게 완성해보세요.
        </p>
      </header>

      {/* ImageUploader는 새 글 작성과 동일하게 UI만 제공 */}
      <ImageUploader />

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

        {/* 썸네일 입력필드 */}
        <div>
          <label
            htmlFor="thumbnailUrl"
            className="text-foreground mb-2 block text-lg font-semibold"
          >
            썸네일 URL
          </label>
          <input
            id="thumbnailUrl"
            type="text"
            placeholder="이미지 URL을 직접 입력하세요 (예: https://...)"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring w-full border p-3 transition focus:ring-2 focus:outline-none"
          />
          {thumbnailUrl && (
            <div className="mt-4">
              <p className="text-muted-foreground mb-2 text-sm">이미지 미리보기:</p>
              <div className="h-48 w-72 overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt="썸네일 미리보기"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  onLoad={(e) => (e.currentTarget.style.display = 'block')}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          )}
        </div>

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

        {/* 마크다운 에디터 */}
        <div data-color-mode={currentTheme}>
          <MDEditor
            value={content}
            onChange={(value) => setContent(value || '')}
            height={800}
            className="rounded-lg-md border-border border"
          />
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-8 flex justify-end gap-4">
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
