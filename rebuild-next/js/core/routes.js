/**
 * routes.js — route definitions.
 * Maps hash patterns → screen module paths + metadata.
 */

export const ROUTES = [
  {
    pattern: /^\/$/,
    screen: 'screens/home.js',
    navKey: 'home',
    title: 'الرئيسية',
  },
  {
    pattern: /^\/worlds$/,
    screen: 'screens/worlds.js',
    navKey: 'worlds',
    title: 'العوالم',
  },
  {
    pattern: /^\/worlds\/([^/]+)$/,
    screen: 'screens/world-detail.js',
    navKey: 'worlds',
    title: 'العالم',
    paramNames: ['worldId'],
  },
  {
    pattern: /^\/crew$/,
    screen: 'screens/crew.js',
    navKey: 'crew',
    title: 'الطاقم',
  },
  {
    pattern: /^\/crew\/([^/]+)$/,
    screen: 'screens/member.js',
    navKey: 'crew',
    title: 'عضو الطاقم',
    paramNames: ['memberId'],
  },
  {
    pattern: /^\/questions$/,
    screen: 'screens/fan-questions.js',
    navKey: 'questions',
    title: 'أسئلة الجمهور',
  },
  {
    pattern: /^\/challenges\/([^/]+)$/,
    screen: 'screens/challenge-detail.js',
    navKey: null,
    title: 'التحدي',
    paramNames: ['challengeId'],
  },
  {
    pattern: /^\/play\/([^/]+)$/,
    screen: 'screens/play.js',
    navKey: null,
    title: 'تحدي',
    paramNames: ['challengeId'],
  },
  {
    pattern: /^\/result\/([^/]+)$/,
    screen: 'screens/result.js',
    navKey: null,
    title: 'النتيجة',
    paramNames: ['challengeId'],
  },
];

/** Bottom nav tabs config */
export const NAV_TABS = [
  { key: 'home',      label: 'الرئيسية', path: '/',         icon: 'home'     },
  { key: 'worlds',    label: 'العوالم',   path: '/worlds',   icon: 'globe'    },
  { key: 'crew',      label: 'الطاقم',    path: '/crew',     icon: 'users'    },
  { key: 'questions', label: 'الأسئلة',   path: '/questions',icon: 'message'  },
];

/** Match a path against ROUTES, return { route, params } or null */
export function matchRoute(path) {
  for (const route of ROUTES) {
    const m = path.match(route.pattern);
    if (!m) continue;
    const params = {};
    (route.paramNames || []).forEach((name, i) => {
      params[name] = m[i + 1];
    });
    return { route, params };
  }
  return null;
}
