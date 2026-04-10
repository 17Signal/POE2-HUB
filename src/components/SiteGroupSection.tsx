import type { SiteGroup } from '../data/siteGroups';
import { SiteLinkCard } from './SiteLinkCard';

type SiteGroupSectionProps = {
  group: SiteGroup;
};

export function SiteGroupSection({ group }: SiteGroupSectionProps) {
  return (
    <section className="group-panel px-6 py-6 md:px-8 md:py-7" aria-labelledby={`${group.id}-title`}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.32em] text-poe-ember">Navigation Group</p>
          <h2 id={`${group.id}-title`} className="font-poe text-2xl tracking-[0.16em] text-poe-gold">
            {group.title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-poe-ash">{group.description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {group.links.map((site) => (
          <SiteLinkCard key={site.url} site={site} />
        ))}
      </div>
    </section>
  );
}
