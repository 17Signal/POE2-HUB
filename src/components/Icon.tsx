import type { ReactNode } from 'react';

const icons = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" /></>,
  crest: <><path d="m12 2 8 5v6c0 4-5 7-8 9-3-2-8-5-8-9V7l8-5Z" /><path d="M9 8v8m6-8v8M8 8h8M8 16h8" /></>,
  forum: <><path d="M20 11a8 8 0 0 1-8 8H8l-5 3 1.5-6A8 8 0 1 1 20 11Z" /><path d="M8 10h8M8 14h5" /></>,
  trade: <><path d="M12 3v17M5 20h14M4 7h16M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z" /><circle cx="12" cy="5" r="2" /></>,
  tree: <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><circle cx="12" cy="12" r="2" /><path d="M12 6v4m-1.5 3.5L6.5 17m7-3.5 4 3.5" /></>,
  ninja: <><path d="m12 2 3 6 7 4-6 3-4 7-3-6-7-4 6-3 4-7Z" /><circle cx="12" cy="12" r="2.5" /></>,
  rune: <><path d="M7 21V3l10 6-10 5m4-2 7 9" /></>,
  mushroom: <><path d="M3 13a9 9 0 0 1 18 0H3Zm7 0-1 7a6 6 0 0 0 6 0l-1-7" /><path d="M7 10h.01M12 7h.01M16 10h.01" strokeWidth="3" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  gamer: <><path d="M7 7h10c3 0 4 4 4 8s-2 5-4 2l-2-2H9l-2 2c-2 3-4 2-4-2s1-8 4-8Z" /><path d="M8 9v5m-2.5-2.5h5M16 10h.01M18 13h.01" /></>,
  flag: <><path d="M5 22V3m0 1c5-4 9 4 15 0v11c-6 4-10-4-15 0" /></>,
  external: <path d="M7 17 17 7M7 7h10v10" />,
  github: <><path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-2.5c3.4-.4 7-1.7 7-7.5a5.8 5.8 0 0 0-1.5-4c.2-1 .2-2-.3-3-1.5 0-3 1-3.7 1.5a13 13 0 0 0-7 0C7.8 2 6.3 1 4.8 1c-.5 1-.5 2-.3 3A5.8 5.8 0 0 0 3 8c0 5.8 3.6 7.1 7 7.5A3.5 3.5 0 0 0 9 18v4" /></>,
  up: <path d="m6 10 6-6 6 6M12 4v16" />
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
