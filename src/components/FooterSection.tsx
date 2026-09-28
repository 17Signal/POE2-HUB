import { Icon } from './Icon';

export function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer-credit"><span className="footer-brand">PoE2 HUB</span><span>玩家自建 · 非官方网站</span></div>
      <div className="footer-links">
        <a href="https://github.com/17Signal/POE2-HUB" target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
        <a href="https://github.com/17Signal/POE2-HUB/issues/new?title=%E9%93%BE%E6%8E%A5%E5%8F%8D%E9%A6%88" target="_blank" rel="noopener noreferrer">反馈失效链接<Icon name="external" /></a>
        <a href="#top" aria-label="回到顶部"><Icon name="up" /></a>
      </div>
    </footer>
  );
}
