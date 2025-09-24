/** @type {import('tailwindcss').Config} */
export default {
  // content는 Tailwind가 어떤 파일들을 스캔해서
  // 사용된 클래스를 찾아낼지 알려주는 중요한 설정입니다.
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  // plugins 배열에 사용하려는 플러그인을 직접 등록해줍니다.
  // 이렇게 하면 Tailwind가 플러그인을 놓치지 않습니다.
  plugins: [require('@tailwindcss/typography')],
};
