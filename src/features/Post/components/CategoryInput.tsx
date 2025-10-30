import { useState } from 'react';

import { useGetCategories } from '@/features/Archive/hooks/useGetCategories';
import { useCreateCategory } from '@/features/Post/hooks/useCreateCategory';

interface CategoryInputProps {
  value: number;
  onChange: (id: number) => void;
}

const CategoryInput = ({ value, onChange }: CategoryInputProps) => {
  const { categories } = useGetCategories(); // 카테고리 목록 조회
  const { mutate: createCategory, isPending } = useCreateCategory(); // 카테고리 생성

  // 2. "새 카테고리 추가" UI를 토글하기 위한 상태
  const [isAddingNew, setIsAddingNew] = useState(false);
  // 3. 새 카테고리 이름을 입력받기 위한 상태
  const [newCategoryName, setNewCategoryName] = useState('');

  /**
   * '저장' 버튼 클릭 시 (새 카테고리 생성)
   */
  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      alert('카테고리 이름을 입력하세요.');
      return;
    }

    // 4. useMutation의 mutate 함수를 호출
    createCategory(
      { category: newCategoryName.trim() },
      {
        // 5. 생성 성공 시 (API가 { categoryId: number } 반환)
        onSuccess: (data) => {
          // data는 API가 반환한 result({ categoryId: ... }) 입니다.
          // (useCreateCategory 훅의 onSuccess는 쿼리 무효화만 하고,
          // 이 onSuccess는 mutate 함수 자체의 콜백입니다.)

          // 6. 부모(PostNewPage)의 상태를 새로 생성된 ID로 업데이트
          onChange(data.categoryId);

          // 7. 입력 필드 초기화 및 UI 닫기
          setNewCategoryName('');
          setIsAddingNew(false);
        },
      },
    );
  };

  return (
    <div>
      <label htmlFor="category" className="text-foreground mb-2 block text-lg font-semibold">
        카테고리
      </label>

      {/* === 새 카테고리 추가 UI === */}
      {isAddingNew ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="새 카테고리 이름"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="bg-card text-foreground placeholder:text-muted-foreground rounded-lg-md border-border focus:ring-ring flex-1 border p-3 transition focus:ring-2 focus:outline-none"
          />
          <button
            onClick={handleAddNewCategory}
            disabled={isPending}
            className="rounded-lg-md bg-primary text-primary-foreground px-4 py-2 font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? '저장중...' : '저장'}
          </button>
          <button
            onClick={() => setIsAddingNew(false)}
            className="rounded-lg-md bg-secondary text-secondary-foreground hover:bg-muted px-4 py-2 font-semibold transition-colors"
          >
            취소
          </button>
        </div>
      ) : (
        /* === 기존 카테고리 선택 UI === */
        <div className="flex items-center gap-2">
          <select
            id="category"
            value={value || ''} // 부모에서 받은 value 사용
            onChange={(e) => onChange(Number(e.target.value))} // 부모의 onChange 호출
            className="bg-card text-foreground rounded-lg-md border-border focus:ring-ring flex-1 border p-3 transition focus:ring-2 focus:outline-none"
          >
            <option value="">카테고리 선택</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} ({cat.postCount})
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsAddingNew(true)}
            className="rounded-lg-md bg-muted text-muted-foreground hover:bg-secondary px-4 py-2 font-semibold transition-colors"
          >
            + 새 카테고리 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryInput;
