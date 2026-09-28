import { FooterSection } from './components/FooterSection';
import { CategoryNav } from './components/CategoryNav';
import { HeroSection } from './components/HeroSection';
import { SiteGroupSection } from './components/SiteGroupSection';
import { siteGroups } from './data/siteGroups';

function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#sites">跳至站点导航</a>
      <HeroSection />
      <CategoryNav />
      <main id="sites" className="site-groups" aria-label="站点导航分组" tabIndex={-1}>
        {siteGroups.map((group) => (
          <SiteGroupSection key={group.id} group={group} />
        ))}
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
