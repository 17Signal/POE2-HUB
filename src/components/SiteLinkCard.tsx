import type { SiteLink } from '../data/siteGroups';
import { Icon } from './Icon';

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
    <article>
      <a className={`site-card accent-${site.accent}`} href={site.url} target="_blank" rel="noopener noreferrer"
        aria-label={`${site.name}（在新标签页打开）`}>
        <span className="site-icon"><Icon name={site.icon} /></span>
        <div className="site-content">
          <div className="site-title-row">
            <h3>{site.name}</h3>
            <span className="language-tag">{site.language}</span>
          </div>
          <p className="site-hostname">{getHostname(site.url)}</p>
        </div>
        <Icon name="external" className="site-arrow" />
        <p className="site-description">{site.description}</p>
      </a>
    </article>
  );
}
