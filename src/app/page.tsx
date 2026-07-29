import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { GithubStatsSection } from '@/components/sections/GithubStatsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { LeadershipSection } from '@/components/sections/LeadershipSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <GithubStatsSection />
      <SkillsSection />
      <ExperienceSection />
      <LeadershipSection />
      <ContactSection />
    </div>
  );
}
