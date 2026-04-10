# PoE2 HUB Navigation Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current PoE2 HUB into a read-only grouped navigation page, initialize this workspace as a git repository for `17Signal/POE2-HUB`, and rewrite the README for local development and GitHub Pages deployment.

**Architecture:** Replace the current mutable bookmark-manager flow with static grouped data rendered by small read-only React components. Add a lightweight Vitest + Testing Library setup to lock in the removal of editing/storage UI and verify grouped navigation rendering before styling and documentation cleanup.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library, Git

---

## File Structure

- Create: `.gitignore`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/SiteGroupSection.tsx`
- Create: `src/components/SiteLinkCard.tsx`
- Create: `src/components/FooterSection.tsx`
- Create: `src/data/siteGroups.ts`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `index.html`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `tsconfig.app.json`
- Modify: `vite.config.ts`
- Modify: `README.md`
- Delete: `src/data/seedSites.ts`

### Task 1: Initialize Git Repository And Ignore Generated Files

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create the repository ignore rules**

```gitignore
node_modules/
dist/
coverage/
.superpowers/
*.tsbuildinfo
.DS_Store
Thumbs.db
```

- [ ] **Step 2: Initialize git and attach the GitHub remote**

Run:

```bash
git init
git branch -M main
git remote add origin https://github.com/17Signal/POE2-HUB.git
git remote -v
```

Expected:

```text
origin  https://github.com/17Signal/POE2-HUB.git (fetch)
origin  https://github.com/17Signal/POE2-HUB.git (push)
```

- [ ] **Step 3: Stage the repository bootstrap**

Run:

```bash
git add .gitignore docs/superpowers/specs/2026-04-10-poe2-hub-navigation-redesign-design.md docs/superpowers/plans/2026-04-10-poe2-hub-navigation-redesign.md
git status --short
```

Expected:

```text
A  .gitignore
A  docs/superpowers/plans/2026-04-10-poe2-hub-navigation-redesign.md
A  docs/superpowers/specs/2026-04-10-poe2-hub-navigation-redesign-design.md
```

- [ ] **Step 4: Commit the bootstrap state**

Run:

```bash
git commit -m "chore: initialize repository metadata"
```

Expected:

```text
[main (root-commit) ...] chore: initialize repository metadata
```

### Task 2: Add Test Harness For The Read-Only Homepage

**Files:**
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tsconfig.app.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Add testing dependencies and scripts**

Update `package.json` to:

```json
{
  "name": "poe2-aggregator",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:offline": "npm run build && node scripts/inline.mjs",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "typescript": "^5.6.3",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}
```

Then run:

```bash
npm install
```

Expected:

```text
added ... packages
```

- [ ] **Step 2: Add Vitest configuration and TypeScript test types**

Update `vite.config.ts` to:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true
  }
});
```

Update `tsconfig.app.json` compiler types to:

```json
"types": ["vite/client", "vitest/globals"]
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Write the failing homepage tests**

Create `src/App.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the read-only hero and grouped navigation', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'PoE2 HUB' })
    ).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: '官方入口' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '构筑工具' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '数据资料' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '社区论坛' })).toBeInTheDocument();
  });

  it('removes editor-style controls and only exposes outbound links', () => {
    render(<App />);

    expect(screen.queryByRole('button', { name: '添加站点' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '编辑' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '删除' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '重置' })).not.toBeInTheDocument();

    const cards = screen.getAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);

    cards.forEach((card) => {
      const link = within(card).getByRole('link', { name: '前往站点' });
      expect(link).toHaveAttribute('href');
    });
  });
});
```

- [ ] **Step 4: Run the tests to confirm the current app fails**

Run:

```bash
npm test
```

Expected:

```text
FAIL  src/App.test.tsx
```

- [ ] **Step 5: Commit the test harness**

Run:

```bash
git add package.json package-lock.json tsconfig.app.json vite.config.ts src/test/setup.ts src/App.test.tsx
git commit -m "test: add homepage regression coverage"
```

Expected:

```text
[main ...] test: add homepage regression coverage
```

### Task 3: Replace Mutable Site Data With Static Grouped Content

**Files:**
- Create: `src/data/siteGroups.ts`
- Delete: `src/data/seedSites.ts`

- [ ] **Step 1: Create grouped navigation data**

Create `src/data/siteGroups.ts`:

```ts
export type SiteLink = {
  name: string;
  url: string;
  description: string;
};

export type SiteGroup = {
  id: string;
  title: string;
  description: string;
  links: SiteLink[];
};

export const siteGroups: SiteGroup[] = [
  {
    id: 'official',
    title: '官方入口',
    description: '优先查看公告、账号服务和官方交易入口。',
    links: [
      {
        name: 'Path of Exile 官方网站',
        url: 'https://www.pathofexile.com/',
        description: '账号、公告、赛季信息与官方新闻入口。'
      },
      {
        name: 'Official Forums',
        url: 'https://www.pathofexile.com/forum',
        description: '官方论坛、开发者帖子与社区公告。'
      },
      {
        name: 'Official Trade',
        url: 'https://www.pathofexile.com/trade2/search/poe2/',
        description: 'PoE2 官方交易检索与物品筛选入口。'
      }
    ]
  },
  {
    id: 'build-tools',
    title: '构筑工具',
    description: '查流行 BD、参考配装思路、规划角色路线。',
    links: [
      {
        name: 'PoE2 Ninja Builds',
        url: 'https://poe2.ninja/builds/',
        description: '查看主流构筑、热度变化与版本环境趋势。'
      },
      {
        name: 'PoE2 Ren Builds',
        url: 'https://poe2.ren/builds/',
        description: '社区构筑索引，适合快速抄作业与找灵感。'
      },
      {
        name: 'Caimogu Planner',
        url: 'https://poe2.caimogu.cc/planner#/plan/community-builds',
        description: '构筑规划与社区方案浏览入口。'
      }
    ]
  },
  {
    id: 'reference',
    title: '数据资料',
    description: '技能、物品、机制与数据库信息集中查看。',
    links: [
      {
        name: 'PoE2DB',
        url: 'https://poe2db.tw/',
        description: '最常用的 PoE2 数据库、物品与机制查询站。'
      }
    ]
  },
  {
    id: 'community',
    title: '社区论坛',
    description: '快速进入中文与地区社区，补充资讯和讨论视角。',
    links: [
      {
        name: 'Gamer TW Forum',
        url: 'https://forum.gamer.com.tw/B.php?bsn=82273',
        description: '巴哈姆特 PoE2 讨论版，适合看繁中社区内容。'
      },
      {
        name: 'NGA Forum',
        url: 'https://bbs.nga.cn/thread.php?fid=510481',
        description: 'NGA PoE2 版块，适合看国区玩家讨论与经验帖。'
      },
      {
        name: 'Caimogu Circle',
        url: 'https://www.caimogu.cc/circle/449.html',
        description: '菜蘑菇 PoE2 社区资讯、帖子与中文讨论入口。'
      }
    ]
  }
];
```

- [ ] **Step 2: Remove the old mutable seed file**

Run:

```bash
git rm src/data/seedSites.ts
```

Expected:

```text
rm 'src/data/seedSites.ts'
```

- [ ] **Step 3: Commit the data migration**

Run:

```bash
git add src/data/siteGroups.ts
git commit -m "refactor: group site data for static navigation"
```

Expected:

```text
[main ...] refactor: group site data for static navigation
```

### Task 4: Implement The Read-Only Navigation Homepage

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/SiteGroupSection.tsx`
- Create: `src/components/SiteLinkCard.tsx`
- Create: `src/components/FooterSection.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Replace the main app with static sections**

Update `src/App.tsx` to:

```tsx
import { FooterSection } from './components/FooterSection';
import { HeroSection } from './components/HeroSection';
import { SiteGroupSection } from './components/SiteGroupSection';
import { siteGroups } from './data/siteGroups';

function App() {
  return (
    <div className="app-shell">
      <div className="app-backdrop" aria-hidden="true" />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-5 py-8 md:px-8 md:py-10 xl:px-10">
        <HeroSection />
        <section className="space-y-6" aria-label="站点导航分组">
          {siteGroups.map((group) => (
            <SiteGroupSection key={group.id} group={group} />
          ))}
        </section>
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Create the hero and footer components**

Create `src/components/HeroSection.tsx`:

```tsx
export function HeroSection() {
  return (
    <header className="hero-panel overflow-hidden px-6 py-8 md:px-8 md:py-10">
      <div className="hero-grid gap-8">
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
          <p className="text-sm leading-7 text-poe-ash">
            站点内容由仓库内的静态数据维护，适合部署在 GitHub Pages 作为长期入口页。
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
```

Create `src/components/FooterSection.tsx`:

```tsx
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
```

- [ ] **Step 3: Create grouped section and link card components**

Create `src/components/SiteLinkCard.tsx`:

```tsx
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
    <article className="site-card" aria-label={site.name}>
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
```

Create `src/components/SiteGroupSection.tsx`:

```tsx
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
```

- [ ] **Step 4: Replace the stylesheet and document title for the new visual direction**

Update `index.html` to:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0f0d0a" />
    <meta
      name="description"
      content="PoE2 HUB 是一个 Path of Exile 2 常用入口聚合页，集中整理官方、构筑、资料与社区导航。"
    />
    <title>PoE2 HUB | 流放之路 2 常用入口导航</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Update `src/index.css` to:

```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background: #0a0908;
  color: #ede6d8;
  font-family: 'Noto Sans SC', system-ui, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

#root {
  min-height: 100vh;
}

.font-poe {
  font-family: 'Cinzel', 'Times New Roman', serif;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at top, rgba(212, 179, 93, 0.16), transparent 38%),
    radial-gradient(circle at 18% 22%, rgba(192, 107, 42, 0.12), transparent 26%),
    linear-gradient(180deg, #120f0c 0%, #0d0b09 45%, #090807 100%);
}

.app-backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.03), transparent 25%),
    linear-gradient(180deg, rgba(255, 209, 132, 0.06), transparent 30%);
  mask-image: radial-gradient(circle at top, black 30%, transparent 80%);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.8fr);
}

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }
}

@layer components {
  .poe-panel {
    @apply rounded-[28px] border border-poe-border bg-poe-panel shadow-poe;
  }

  .poe-panel-muted {
    @apply rounded-[24px] border border-poe-border bg-poe-panel-2 shadow-poe-soft;
  }

  .hero-panel {
    @apply poe-panel relative;
    background:
      linear-gradient(135deg, rgba(255, 225, 160, 0.06), transparent 40%),
      linear-gradient(180deg, rgba(40, 29, 20, 0.9) 0%, rgba(22, 18, 15, 0.96) 100%);
  }

  .hero-note {
    @apply rounded-[20px] border border-poe-border bg-black/15 p-5 backdrop-blur-sm;
  }

  .group-panel {
    @apply poe-panel;
  }

  .site-card {
    @apply flex h-full flex-col justify-between rounded-[22px] border border-poe-border bg-poe-panel-2 p-5 shadow-poe-soft transition;
  }

  .site-card:hover {
    transform: translateY(-2px);
    border-color: rgba(212, 179, 93, 0.55);
  }

  .poe-button {
    @apply inline-flex items-center justify-center rounded-full border border-poe-gold bg-poe-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#20160d] transition hover:brightness-110;
  }

  .poe-button-ghost {
    @apply inline-flex items-center justify-center rounded-full border border-poe-border bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-poe-ash transition hover:border-poe-gold hover:text-poe-gold;
  }
}

.hero-kicker {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.38em;
  font-size: 0.72rem;
  color: #d89a58;
}
```

- [ ] **Step 5: Run the tests and verify they now pass**

Run:

```bash
npm test
```

Expected:

```text
PASS  src/App.test.tsx
```

- [ ] **Step 6: Commit the homepage rewrite**

Run:

```bash
git add index.html src/App.tsx src/index.css src/components/HeroSection.tsx src/components/SiteGroupSection.tsx src/components/SiteLinkCard.tsx src/components/FooterSection.tsx
git commit -m "feat: convert app into static navigation portal"
```

Expected:

```text
[main ...] feat: convert app into static navigation portal
```

### Task 5: Rewrite README For Maintenance And Deployment

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the README with clean Chinese documentation**

Update `README.md` to:

```md
# PoE2 HUB

PoE2 HUB 是一个面向《流放之路 2》的静态导航入口页，用来集中整理官方入口、构筑工具、数据库资料和社区讨论站点。

在线访问：

- GitHub Pages: https://17signal.github.io/POE2-HUB/
- GitHub Repo: https://github.com/17Signal/POE2-HUB

## 项目特点

- 纯静态页面，适合 GitHub Pages 托管
- 只读导航，不包含站点新增、编辑、删除功能
- 按用途分组展示，打开页面即可直达目标站点
- 使用 Vite + React + TypeScript 构建

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址通常为 `http://localhost:5173/`。

## 构建

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。

如需生成离线包：

```bash
npm run build:offline
```

## 测试

```bash
npm test
```

## 站点数据维护

导航数据维护在：

- `src/data/siteGroups.ts`

如果你要新增、删除或调整站点链接，直接修改这个文件，然后重新构建并发布即可。

## 发布到 GitHub Pages

1. 本地完成修改后运行 `npm test`
2. 运行 `npm run build`
3. 将最新代码推送到 GitHub 仓库
4. 在 GitHub Pages 中选择正确的发布分支或发布目录
5. 等待 Pages 完成部署后访问线上地址确认效果

如果你使用的是 GitHub Actions 自动发布，也可以在仓库内补充对应工作流。
```

- [ ] **Step 2: Run a final verification pass**

Run:

```bash
npm test
npm run build
```

Expected:

```text
vitest: all tests passed
vite: build completed
```

- [ ] **Step 3: Commit the documentation update**

Run:

```bash
git add README.md
git commit -m "docs: rewrite project readme"
```

Expected:

```text
[main ...] docs: rewrite project readme
```

### Task 6: Final Review And Publish Prep

**Files:**
- Modify: `dist/` via build output

- [ ] **Step 1: Inspect the final working tree**

Run:

```bash
git status --short
```

Expected:

```text
```

- [ ] **Step 2: Confirm commit history is readable**

Run:

```bash
git log --oneline --decorate -5
```

Expected:

```text
... docs: rewrite project readme
... feat: convert app into static navigation portal
... refactor: group site data for static navigation
... test: add homepage regression coverage
... chore: initialize repository metadata
```

- [ ] **Step 3: Push the initialized repository**

Run:

```bash
git push -u origin main
```

Expected:

```text
branch 'main' set up to track 'origin/main'
```

- [ ] **Step 4: Re-publish GitHub Pages from the updated repository**

Run one of:

```text
GitHub repository Settings -> Pages -> select the deployment source for main branch / Pages workflow
```

Expected:

```text
GitHub Pages publishes the updated static homepage at https://17signal.github.io/POE2-HUB/
```

## Self-Review

- Spec coverage: this plan covers repository initialization, removal of editing/storage/filtering UI, grouped static homepage rendering, visual refresh, README rewrite, test/build verification, and push/deploy preparation.
- Placeholder scan: no TODO/TBD placeholders remain; each task has concrete files, commands, and code blocks.
- Type consistency: the plan uses `SiteLink`, `SiteGroup`, and `siteGroups` consistently across data and component tasks.
