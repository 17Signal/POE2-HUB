import type { SiteGroup } from '../data/siteGroups';
import { SiteLinkCard } from './SiteLinkCard';

type SiteGroupSectionProps = {
  group: SiteGroup;
};

export function SiteGroupSection({ group }: SiteGroupSectionProps) {
  return (
    <section id={group.id} className={`site-group${group.links.length === 1 ? ' site-group-single' : ''}`} aria-labelledby={`${group.id}-title`}>
      <div className="group-heading">
        <div className="group-title">
          <h2 id={`${group.id}-title`}>{group.title}</h2>
          <span className="group-count" aria-label={`${group.links.length} 个站点`}>{group.links.length.toString().padStart(2, '0')}</span>
        </div>
        <div className="group-rule" aria-hidden="true" />
        <p>{group.description}</p>
      </div>
      <div className="site-grid">
        {group.links.map((site) => (
          <SiteLinkCard key={site.url} site={site} />
        ))}
      </div>
    </section>
  );
}
