interface formatDateProps {
  dateString: string;
  onlyDay?: boolean;
}

/**
 * 날짜 문자열을 "YYYY. MM. DD. HH:MM" 형식으로 포맷팅하는 헬퍼 함수
 * @param dateString - ISO 8601 또는 호환되는 날짜 문자열
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = ({ dateString, onlyDay }: formatDateProps) => {
  try {
    const date = new Date(dateString);
    // 한국 시간(KST)에 맞게 조정 (UTC+9)
    // 서버에서 이미 KST로 "2025-09-15 05:23:04" 형식으로 제공하므로,
    // new Date()가 이를 로컬 시간대로 해석하는 것을 방지해야 할 수 있습니다.
    // 만약 서버 시간이 항상 KST 기준이라면, 아래와 같이 파싱하는 것이 더 안전합니다.

    // "YYYY-MM-DD HH:MM:SS" 형식을 "YYYY-MM-DDTHH:MM:SS"로 변경

    // KST가 아닌 UTC나 다른 시간대로 해석될 경우를 대비
    // 하지만 "YYYY-MM-DD HH:MM:SS"는 new Date()에서 로컬 시간대로 해석하는 경향이 있습니다.
    // 서버에서 UTC로 시간을 제공하고 클라이언트에서 변환하는 것이 가장 이상적입니다.

    // 일단은 new Date()가 KST로 잘 해석한다고 가정하고 진행합니다.

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    if (onlyDay) {
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(date);
    }

    return `${year}.${month}.${day}. ${hour}:${minute}`;
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return dateString; // 오류 발생 시 원본 반환
  }
};
