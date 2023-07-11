import HeroSection from './hero-section';
import CreatorsGridList from './creators-grid-list';
import SearchSection from './search-section';
import AboutSection from './about-section';
import CTASection from './cta-section';

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
