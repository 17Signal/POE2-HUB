export function HeroSection() {
  return (
    <header className="hero-panel overflow-hidden px-6 py-8 md:px-8 md:py-10">
      <div className="hero-grid items-start gap-8">
        <div className="space-y-4">
          <p className="hero-kicker">Path of Exile 2 Navigation Portal</p>
          <h1 className="font-poe text-4xl tracking-[0.18em] text-poe-gold md:text-5xl">
            PoE2 HUB
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-poe-ash md:text-base">
            一个整理常用入口的 PoE2 静态导航页。打开页面后，你可以直接进入官方公告、
            构筑工具、数据库资料和中文社区，不再需要额外筛选或管理书签。
          </p>
        </div>

        <div className="hero-note space-y-4">
          <p className="text-[11px] uppercase tracking-[0.32em] text-poe-ember">快速入口</p>
          <p className="text-sm leading-7 text-poe-ash">
            站点内容由仓库内的静态数据维护，适合长期部署在 GitHub Pages 作为个人 PoE2 首页入口。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="poe-button"
              href="https://17signal.github.io/POE2-HUB/"
              target="_blank"
              rel="noreferrer"
            >
              打开 Pages
            </a>
            <a
              className="poe-button-ghost"
              href="https://github.com/17Signal/POE2-HUB"
              target="_blank"
              rel="noreferrer"
            >
              查看仓库
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
