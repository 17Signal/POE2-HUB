import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the read-only hero and grouped navigation', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'PoE2 HUB' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '官方入口' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '构筑工具' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '数据资料' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '社区论坛' })).toBeInTheDocument();
  });

  it('removes editor controls and keeps only outbound site links', () => {
    render(<App />);

    expect(screen.queryByRole('button', { name: '添加站点' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '编辑' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '删除' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '重置' })).not.toBeInTheDocument();

    const cards = screen.getAllByRole('article');
    expect(cards.length).toBeGreaterThan(0);

    cards.forEach((card) => {
      const siteName = within(card).getByRole('heading', { level: 3 }).textContent;
      const link = within(card).getByRole('link', { name: `${siteName}（在新标签页打开）` });
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toContainElement(within(card).getByRole('heading', { level: 3 }));
    });
  });

  it('links every category to its section on the same page', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: '分类跳转' });
    const links = within(navigation).getAllByRole('link');
    expect(links).toHaveLength(4);
    links.forEach((link) => {
      const href = link.getAttribute('href')!;
      expect(href).toMatch(/^#/);
      const section = document.getElementById(href.slice(1));
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby');
    });
  });
});
