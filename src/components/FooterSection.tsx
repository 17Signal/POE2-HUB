export function FooterSection() {
  return (
    <footer className="poe-panel-muted flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.32em] text-poe-ember">维护说明</p>
        <p className="max-w-2xl text-sm leading-6 text-poe-ash">
          当前页面为只读导航入口，站点数据存放在源码中。后续新增或调整链接时，直接修改数据文件并重新部署 GitHub Pages 即可。
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          className="poe-button-ghost"
          href="https://github.com/17Signal/POE2-HUB"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repo
        </a>
        <a
          className="poe-button-ghost"
          href="https://17signal.github.io/POE2-HUB/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Pages
        </a>
      </div>
    </footer>
  );
}
