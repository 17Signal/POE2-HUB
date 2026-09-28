import { siteGroups } from '../data/siteGroups';
import { Icon } from './Icon';

export function CategoryNav() {
  return (
    <nav className="category-nav" aria-label="分类跳转">
      <div className="category-links">
        {siteGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`}>
            <Icon name={group.icon} />
            <span>{group.title}</span>
            <span className="category-count">{group.links.length.toString().padStart(2, '0')}</span>
          </a>
        ))}
      </div>
      <span className="nav-hint">探索你的下一站 <Icon name="external" /></span>
    </nav>
  );
}
