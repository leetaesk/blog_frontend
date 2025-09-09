// 프론트엔드 컴포넌트 파일 (예: App.js 또는 App.vue)
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    try {
      // 백엔드 API 엔드포인트로 요청
      const response = await fetch('http://localhost:3000/api/test');
      const text = await response.text();
      setMessage(text);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to connect to the backend.');
    }
  };

  return (
    <div>
      <button onClick={handleClick}>백엔드에 요청하기</button>
      <p>서버 응답: {message}</p>
    </div>
  );
}

export default App;
