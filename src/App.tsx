import { FooterSection } from './components/FooterSection';
import { HeroSection } from './components/HeroSection';
import { SiteGroupSection } from './components/SiteGroupSection';
import { siteGroups } from './data/siteGroups';

function App() {
  return (
    <div className="app-shell">
      <div className="app-backdrop" aria-hidden="true" />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-5 py-8 md:gap-10 md:px-8 md:py-10 xl:px-10">
        <HeroSection />
        <section className="space-y-6" aria-label="站点导航分组">
          {siteGroups.map((group) => (
            <SiteGroupSection key={group.id} group={group} />
          ))}
        </section>
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
