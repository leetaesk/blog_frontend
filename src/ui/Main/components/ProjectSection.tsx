import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { ScrollReveal } from '@/ui/Main/MainPage';

const ProjectSection = () => (
  <section className="py-24">
    <ScrollReveal>
      <div className="w-full px-4 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center text-foreground md:text-4xl">
          Featured Project
        </h2>
        <div className="max-w-4xl mx-auto overflow-hidden shadow-lg bg-card rounded-xl md:flex">
          <div className="md:w-1/2">
            <img
              className="object-cover w-full h-64 md:h-full"
              src="https://placehold.co/800x600/7c3aed/ffffff?text=grabPT"
              alt="grabPT project screenshot"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:w-1/2">
            <div className="text-sm font-semibold tracking-wide uppercase text-primary">
              Front-end Lead
            </div>
            <h3 className="mt-1 text-2xl font-bold text-card-foreground">grabPT</h3>
            <p className="mt-2 text-muted-foreground">
              사용자 맞춤형 PT 트레이너 매칭 서비스. React와 TypeScript를 사용하여 인터랙티브한
              UI/UX를 설계하고 구현을 리드했습니다.
            </p>
            <div className="mt-4">
              <a
                rel="noopener"
                href="http://www.grabpt.com"
                target="_blank"
                className="inline-flex items-center font-medium text-primary group hover:underline"
              >
                사이트 방문하기 <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  </section>
);

export default ProjectSection;
