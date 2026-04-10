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
  },
  {
    id: 'reference',
    title: '数据资料',
    description: '技能、物品、机制与数据库信息集中查看。',
    links: [
      {
        name: 'PoE2DB',
        url: 'https://poe2db.tw/',
        description: '常用的 PoE2 数据库、物品与机制查询站。'
      }
    ]
  }
];
