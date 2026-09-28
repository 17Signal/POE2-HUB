import type { IconName } from '../components/Icon';

export type SiteLink = {
  name: string;
  url: string;
  description: string;
  icon: IconName;
  language: string;
  accent: 'gold' | 'blue' | 'green' | 'rose';
};

export type SiteGroup = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  links: SiteLink[];
};

export const siteGroups: SiteGroup[] = [
  {
    id: 'official',
    title: '官方入口',
    description: '公告、账号与交易，一步直达。',
    icon: 'compass',
    links: [
      {
        name: '流放之路官网',
        url: 'https://www.pathofexile.com/',
        description: '查看官方新闻、赛季公告与账号服务。',
        icon: 'crest', language: '英文', accent: 'gold'
      },
      {
        name: '官方论坛',
        url: 'https://www.pathofexile.com/forum',
        description: '追踪开发者动态、更新说明与社区公告。',
        icon: 'forum', language: '英文', accent: 'gold'
      },
      {
        name: '官方交易所',
        url: 'https://www.pathofexile.com/trade2/search/poe2/',
        description: '筛选装备词缀，寻找合适的交易物品。',
        icon: 'trade', language: '多语言', accent: 'gold'
      }
    ]
  },
  {
    id: 'build-tools',
    title: '构筑工具',
    description: '寻找下一套 BD，规划你的角色。',
    icon: 'tree',
    links: [
      {
        name: 'PoE2 Ninja',
        url: 'https://poe2.ninja/builds/',
        description: '查看热门 BD、角色配装与版本趋势。',
        icon: 'ninja', language: '英文', accent: 'blue'
      },
      {
        name: 'PoE2 Ren',
        url: 'https://poe2.ren/builds/',
        description: '浏览社区构筑，快速抄作业、找灵感。',
        icon: 'rune', language: '简中', accent: 'rose'
      },
      {
        name: '菜蘑菇构筑规划',
        url: 'https://poe2.caimogu.cc/planner#/plan/community-builds',
        description: '规划角色路线，参考社区配装方案。',
        icon: 'mushroom', language: '简中', accent: 'green'
      }
    ]
  },
  {
    id: 'reference',
    title: '数据资料',
    description: '技能、物品与机制，随手查阅。',
    icon: 'database',
    links: [
      {
        name: 'PoE2DB',
        url: 'https://poe2db.tw/',
        description: '查询技能、装备、词缀与游戏机制，构筑前先查资料。',
        icon: 'database', language: '多语言', accent: 'blue'
      }
    ]
  },
  {
    id: 'community',
    title: '社区论坛',
    description: '交流心得，也听听其他流放者的故事。',
    icon: 'forum',
    links: [
      {
        name: '巴哈姆特',
        url: 'https://forum.gamer.com.tw/B.php?bsn=82273',
        description: '逛逛繁中讨论区，交流攻略与游戏心得。',
        icon: 'gamer', language: '繁中', accent: 'blue'
      },
      {
        name: 'NGA 玩家社区',
        url: 'https://bbs.nga.cn/thread.php?fid=510481',
        description: '参与 PoE2 讨论，阅读玩家经验与攻略。',
        icon: 'flag', language: '简中', accent: 'gold'
      },
      {
        name: '菜蘑菇社区',
        url: 'https://www.caimogu.cc/circle/449.html',
        description: '关注中文资讯，分享发现与开荒日常。',
        icon: 'mushroom', language: '简中', accent: 'green'
      }
    ]
  }
];
