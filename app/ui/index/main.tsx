import HeroSection from '@/app/ui/index/hero-section';
import CreatorsGridList from '@/app/ui/index/creators-grid-list';
import SearchSection from '@/app/ui/index/search-section';
import AboutSection from '@/app/ui/index/about-section';
import CTASection from '@/app/ui/index/cta-section';

const Main = () => (
  <main className="p-8">
    <HeroSection />
    <CreatorsGridList />
    <SearchSection />
    <AboutSection />
    <CTASection />
  </main>
);

export default Main;
