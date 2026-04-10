import type { SiteLink } from '../data/siteGroups';

type SiteLinkCardProps = {
  site: SiteLink;
};

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function SiteLinkCard({ site }: SiteLinkCardProps) {
  return (
    <article className="site-card">
      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-poe text-lg tracking-[0.12em] text-poe-gold">{site.name}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-poe-ember">{getHostname(site.url)}</p>
        </div>
        <p className="text-sm leading-6 text-poe-ash">{site.description}</p>
      </div>
      <a className="poe-button mt-6" href={site.url} target="_blank" rel="noreferrer">
        前往站点
      </a>
    </article>
  );
}
