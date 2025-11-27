import github from '@/assets/images/githubLogo.png';
import instagram from '@/assets/images/instagramLogo.png';
import threads from '@/assets/images/threadsLogo.png';
import velog from '@/assets/images/velogLogo.jpg';
import ModelViewer from '@/components/ModelViewer';
import ExternalLink from '@/ui/AboutMe/components/ExternalLink';
import ProjectSection from '@/ui/AboutMe/components/ProjectSection';
import SectionTitleBox from '@/ui/AboutMe/components/SectionTitileBox';
import SkillBar from '@/ui/AboutMe/components/SkillBar';

const AboutMePage = () => {
  const mySkills = [
    { skill: 'JavaScript / TypeScript', percentage: 90 },
    { skill: 'React', percentage: 85 },
    { skill: 'TailwindCSS', percentage: 85 },
    { skill: 'Zustand, ReduxToolkit', percentage: 80 },
    { skill: 'Node.js & Express', percentage: 40 },
    { skill: 'PostgreSQL', percentage: 30 },
    { skill: 'AWS', percentage: 5 },
    { skill: 'Docker', percentage: 20 },
  ];

  return (
    <div className="font-archivo mb-8 w-full max-w-7xl p-4">
      <div className="flex justify-between gap-12">
        <div>
          <div className="my-4 border-l-2 border-gray-400 px-4">
            <h1 className="text-6xl font-bold">Lee Tae Seok</h1>
            <h2 className="text-2xl font-semibold">FrontEnd Developer</h2>
            <br />
            <div>
              <span>
                안녕하세요, 프론트엔드 개발자 이태석입니다. React와 Node.js, express를 사용하여 개인
                블로그를 만들었습니다. 트러블슈팅부터 개인적인 일상까지 글로 끄적여볼까 합니다.{' '}
                <br />
                모두에게는 아니겠지만, 단 한 사람에게라도 도움이 되었으면 합니다.
              </span>
            </div>
          </div>
          <div className="border-t p-4">
            <h2 className="text-xl font-bold italic">Contact me</h2>
            <br />
            <span className="grid grid-cols-[1fr_2fr] items-center gap-2">
              <span className="text-xl">☎️ Tel</span>
              <p>010-2563-5930</p>
              <span className="text-xl">✉️ E-mail</span>
              <span>leetaesuka@gmail.com</span>
              <div></div>
              <span>itasuk@naver.com</span>
              <span className="text-xl">🤝 Social</span>
              <div className="flex gap-2 pt-2">
                <ExternalLink
                  href={'https://instagram.com/ttttt_sk'}
                  children={<img src={instagram} aria-label="인스타" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://github.com/leetaesk'}
                  children={<img src={github} aria-label="깃허브" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://instagram.com'}
                  children={<img src={threads} aria-label="쓰레드" className="h-9 w-9" />}
                />
                <ExternalLink
                  href={'https://instagram.com'}
                  children={<img src={velog} aria-label="벨로그" className="h-9 w-9 rounded-xl" />}
                />
              </div>
            </span>
          </div>
        </div>
        <div>
          <ModelViewer
            url={
              'https://cdn.jsdelivr.net/gh/leetaesk/assets@main/man%20in%20blazer%203d%20model%20(2).compressed.glb'
            }
            width={400}
            height={400}
            defaultRotationX={-50}
            defaultRotationY={20}
            // environmentPreset="forest"
            autoRotate
            autoRotateSpeed={0.5}
            // maxZoomDistance={100}
            minZoomDistance={0.2}
            autoFrame
            // fadeIn
          />
        </div>
      </div>

      {/* 어바웃미 */}
      <div className="font-archivo text-foreground mt-12 gap-6 text-center text-xs leading-none font-bold tracking-[-0.03em] antialiased">
        <SectionTitleBox>
          <div>
            <p className="text-4xl">About Me</p>
          </div>
          <div className="flex h-full items-end">
            <p>FRONTEND DEVELOPER</p>
          </div>
        </SectionTitleBox>
        {/* 여기에 스킬 바 섹션 추가! */}
        <div className="mt-8 px-4 text-left">
          <h3 className="mb-6 text-2xl">My Tech Stack</h3>

          {/* 반응형 그리드: 모바일은 1열, 큰 화면은 2열로 나오게 설정 */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
            {mySkills.map((item) => (
              <SkillBar key={item.skill} skill={item.skill} percentage={item.percentage} />
            ))}
          </div>
        </div>

        {/* 여기에 프로젝트 섹션 추가! */}
        <div className="mt-8 px-4 text-left">
          <h3 className="mb-6 text-2xl">My Projects</h3>

          <ProjectSection />
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
