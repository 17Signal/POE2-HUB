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
