import { siteGroups } from '../data/siteGroups';
import { Icon } from './Icon';

export function HeroSection() {
  const siteCount = siteGroups.reduce((total, group) => total + group.links.length, 0);

  return (
    <header className="hero" id="top">
      <div className="hero-brand">
        <div className="brand-emblem"><Icon name="crest" /></div>
        <div>
          <p className="hero-kicker">流放之路 2 · 玩家导航</p>
          <h1>PoE2 <span>HUB</span></h1>
        </div>
      </div>
      <p className="hero-description">交易、构筑、资料与社区。<span>你的下一站，都在这里。</span></p>
      <div className="hero-aside">
        <span className="hero-aside-label">为每一位流放者</span>
        <span>{siteCount} 个精选站点 <span className="text-divider">/</span> {siteGroups.length} 类常用入口</span>
      </div>
    </header>
  );
}
