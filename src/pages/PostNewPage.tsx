import { useState } from 'react';

import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';

import ImageUploader from '@/components/ImageUploader';
import { useGetCategories } from '@/features/Archive/hooks/useGetCategories';
import useThemeStore from '@/store/themeStore';

function PostNewPage() {
  const navigate = useNavigate();
  const currentTheme = useThemeStore((s) => s.theme);

  const { categories } = useGetCategories();

  // 1. DTO에 매핑되는 상태들
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('**새로운 글을 작성해보세요!**');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [tagsInput, setTagsInput] = useState(''); // 태그는 쉼표로 구분된 문자열로 우선 받습니다.

  const handleSave = () => {
    // 1. 태그 문자열을 배열로 파싱
    const tags: string[] | undefined = tagsInput.trim()
      ? tagsInput
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0) // 빈 태그 제거
      : undefined;

    // 2. DTO 객체 구성 (콘솔 출력용)
    const postData = {
      title: title.trim(),
      content: content?.trim(),
      ...(categoryId && { categoryId: Number(categoryId) }),
      ...(summary.trim() && { summary: summary.trim() }),
      ...(thumbnailUrl?.trim() && { thumbnailUrl: thumbnailUrl.trim() }),
      ...(tags && tags.length > 0 && { tags }),
    };

    // 3. 수집된 데이터를 콘솔에 출력
    console.log('--- 수집된 폼 데이터 (DTO) ---', postData);
    alert('콘솔을 확인해보세요! (F12)');
    // navigate('/'); // 성공 시 메인으로 이동 (주석 처리)
  };

  /**
   * '취소' 버튼 클릭 시
   */
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
          새 글 작성하기 ✍️
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          새로운 아이디어를 공유하고 멋진 글을 완성해보세요.
        </p>
      </header>

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
        {/* 2. 썸네일 URL (thumbnailUrl) */}
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
          {/* 이미지 URL 입력 시 간단한 미리보기 */}
          {thumbnailUrl && (
            <div className="mt-4">
              <p className="text-muted-foreground mb-2 text-sm">이미지 미리보기:</p>
              <div className="h-48 w-72 overflow-hidden">
                <img
                  src={thumbnailUrl}
                  alt="썸네일 미리보기"
                  onError={(e) => (e.currentTarget.style.display = 'none')} // URL이 잘못되면 숨김
                  onLoad={(e) => (e.currentTarget.style.display = 'block')} // 로드되면 표시
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. 카테고리 (categoryId) */}
        <div>
          <label htmlFor="category" className="text-foreground mb-2 block text-lg font-semibold">
            카테고리
          </label>
          <select
            id="category"
            value={categoryId || ''}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="bg-card text-foreground rounded-lg-md border-border focus:ring-ring w-full border p-3 transition focus:ring-2 focus:outline-none"
          >
            <option value="">카테고리 선택</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

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

        {/* 마크다운 에디터 */}
        {/* MDEditor는 data-color-mode 속성으로 테마를 제어합니다.
          앱의 테마 상태(light/dark)에 따라 동적으로 값을 설정해줘야 합니다.
        */}
        <div data-color-mode={currentTheme}>
          <MDEditor
            value={content}
            //임마는 undefined 필요하대 ;;
            onChange={(value) => setContent(value || '')}
            height={800}
            className="rounded-lg-md border-border border"
          />
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={handleCancel}
          className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted px-6 py-2 font-semibold transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg-md bg-primary text-primary-foreground px-6 py-2 font-semibold transition-opacity hover:opacity-90"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default PostNewPage;
