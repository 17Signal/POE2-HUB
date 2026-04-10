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
      const link = within(card).getByRole('link', { name: '前往站点' });
      expect(link).toHaveAttribute('href');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('drops the quick-entry and maintenance copy blocks', () => {
    render(<App />);

    expect(screen.queryByText('快速入口')).not.toBeInTheDocument();
    expect(screen.queryByText('维护说明')).not.toBeInTheDocument();
  });
});
