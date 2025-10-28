import { useState } from 'react';

import MDEditor from '@uiw/react-md-editor';
import { useNavigate } from 'react-router-dom';

import ImageUploader from '@/components/ImageUploader';

// TODO: 앱의 현재 테마(light/dark)를 가져오는 로직이 필요합니다.
// 예를 들어, Recoil, Zustand, Context API 등으로 관리할 수 있습니다.
// const { theme } = useTheme();
const currentTheme = 'light'; // 임시로 'light'로 설정

function PostNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>('**새로운 글을 작성해보세요!**');

  const handleSave = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!content?.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    // TODO: API 연동 로직
    console.log({ title, content });
    alert('콘솔을 확인해보세요! 글이 저장되었습니다 (가상).');
    // navigate('/');
  };

  const handleCancel = () => {
    navigate(-1);
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

        {/* 마크다운 에디터 */}
        {/* MDEditor는 data-color-mode 속성으로 테마를 제어합니다.
          앱의 테마 상태(light/dark)에 따라 동적으로 값을 설정해줘야 합니다.
        */}
        <div data-color-mode={currentTheme}>
          <MDEditor
            value={content}
            onChange={setContent}
            height={600}
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
