import type { ImageMetadata } from 'astro';

/* ------------------------------------------------------------------
   Asset helpers — every image lives in src/assets/apps/<id>/
   icon.png · screen-NN.webp (raw screens for the phone) · store-NN.webp
   ------------------------------------------------------------------ */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/apps/*/*.{png,webp,jpg}', { eager: true });

const asset = (id: string, file: string): ImageMetadata => {
  const mod = files[`../assets/apps/${id}/${file}`];
  if (!mod) throw new Error(`Missing asset: ${id}/${file}`);
  return mod.default;
};

const optional = (id: string, file: string): ImageMetadata | undefined =>
  files[`../assets/apps/${id}/${file}`]?.default;

const series = (id: string, prefix: 'screen' | 'store'): ImageMetadata[] =>
  Object.keys(files)
    .filter((k) => k.startsWith(`../assets/apps/${id}/${prefix}-`))
    .sort()
    .map((k) => files[k].default);

/* ------------------------------------------------------------------
   Types
   ------------------------------------------------------------------ */
export type AppStatus = 'live' | 'building' | 'retired';

export interface AppEntry {
  id: string;
  name: string;
  /** Short line under the name, e.g. "AI song creator". */
  category: string;
  /** Timeline label (the year the app shipped or the work happened). */
  year: string;
  /** Human-readable period of my work on it. */
  period: string;
  /** Who it was built for. */
  company: string;
  role: string;
  summary: string;
  highlights: string[];
  /** One verified headline number, with where it came from (kept in code for honesty). */
  metric?: { value: string; label: string; source: string };
  tech: string[];
  status: AppStatus;
  statusLabel: string;
  links: { appStore?: string; googlePlay?: string; page?: string };
  brand: {
    /** Accent used for UI details (chips, links). */
    accent: string;
    /** Ambient glow behind the stage. */
    glow: string;
    /** Background of the launch (splash) screen. */
    splash: string;
    /** Text color on the splash screen. */
    splashInk?: string;
  };
  icon?: ImageMetadata;
  /** Inline SVG used when there is no icon file yet. */
  glyph?: string;
  /** Small honesty note under the links, e.g. "Screens show demo data." */
  note?: string;
  /** Real, unframed app screens shown inside the phone mockup. */
  phone: {
    /** The app's real launch screen; otherwise one is drawn from the icon. */
    splash?: ImageMetadata;
    video?: { src: string; poster: ImageMetadata };
    screens: ImageMetadata[];
    /** Raw screens have no status bar; draw one. */
    statusBar?: boolean;
    /** 'contain' letterboxes screens recorded at a different aspect ratio (e.g. 16:9 Android). */
    fit?: 'cover' | 'contain';
  };
  /** Store screenshots (already framed) — shown as-is around the phone and in the gallery. */
  store: ImageMetadata[];
  reel?: { src: string; poster?: ImageMetadata; label: string };
  heroOrbit?: boolean;
  /** Name shown under the icon on the phone's home screen. */
  shortName?: string;
}

/* ------------------------------------------------------------------
   Apps — newest first. Every number below was checked on 2026-10-09
   against the store listing, git history or the CV (see `source`).
   ------------------------------------------------------------------ */
export const apps: AppEntry[] = [
  {
    id: 'sepello',
    name: 'Sepello',
    shortName: 'Sepello',
    category: 'Shared lists for life’s big moments',
    year: '2026',
    period: 'Apr 2026 – now',
    company: 'My own product',
    role: 'Founder · design, Flutter & Firebase',
    summary:
      'A shared shopping-list app for life’s big moments — a new home, a baby, a wedding, school. Families plan together, start from ready-made lists, and keep track of what’s bought and what’s spent.',
    highlights: [
      'Shared lists with invite codes, viewer and editor roles, and live updates',
      'Ready-made lists for each moment, with a slot for every item’s link and price',
      'Budget, spending and target-date reminders',
      'Built with Claude Code as a daily pair — 160 of 163 commits co-authored with Claude',
    ],
    tech: ['Flutter', 'Firebase', 'Cloud Functions', 'Firestore', 'Claude Code'],
    status: 'building',
    statusLabel: 'Coming soon · iOS & Android',
    links: { page: '/sepello/' },
    brand: { accent: '#ef5a3c', glow: '#7839ee', splash: '#0e0f14', splashInk: '#ffffff' },
    icon: asset('sepello', 'icon.png'),
    phone: { screens: series('sepello', 'screen') },
    store: [],
    heroOrbit: true,
  },
  {
    id: 'kirmizitaslar',
    name: 'Kırmızıtaşlar',
    shortName: 'Kırmızıtaşlar',
    category: 'Store operations app for sales staff',
    year: '2026',
    period: 'Jul 2026 – now',
    company: 'Kırmızıtaşlar · İstikbal dealer, Erzincan',
    role: 'Product lead & developer',
    summary:
      'A private app for the staff of an İstikbal furniture dealer in Erzincan. Staff log sales, collections and returns in a few taps and look up customers, prices and stock — on top of a back office that mirrors the company’s SAP data.',
    highlights: [
      'Step-by-step entry for sales, collections, returns and other costs',
      'Customer cards with sales, collections, cheques and reminders',
      'Price and stock lookup with barcode scanning',
      'NestJS + PostgreSQL back office that imports SAP exports behind anomaly checks, plus a React web panel',
    ],
    tech: ['Flutter', 'NestJS', 'PostgreSQL', 'React', 'SAP data import'],
    status: 'building',
    statusLabel: 'Back office in pilot · staff app in testing',
    links: {},
    note: 'Screens show demo data.',
    brand: { accent: '#ef7b5f', glow: '#c2412d', splash: '#f3f2ef', splashInk: '#1d1d1f' },
    icon: asset('kirmizitaslar', 'icon.png'),
    phone: { splash: asset('kirmizitaslar', 'splash.webp'), screens: series('kirmizitaslar', 'screen') },
    store: [],
  },
  {
    id: 'melodyia',
    name: 'Melodyia',
    shortName: 'Melodyia',
    category: 'AI song creator',
    year: '2026',
    period: 'Apr – Aug 2026',
    company: 'Melody Yazılım · via Appik',
    role: 'Flutter developer',
    summary:
      'Turns a short description — or your own lyrics — into a finished song with vocals. Songs land in a personal library and can be published to a community feed where others play and like them.',
    highlights: [
      'Prompt and lyrics modes with mood, genre, vocal and length controls',
      'Async generation with progress, a persistent now-playing sheet and a library',
      'Community Explore with Rising and Editor’s Pick',
      'Credits, Pro subscriptions and rewarded ads; 10 languages',
    ],
    tech: ['Flutter', 'Stacked MVVM', 'just_audio', 'StoreKit & Play Billing', 'Firebase', 'OneSignal'],
    status: 'live',
    statusLabel: 'Live · launched Aug 2026',
    links: {
      appStore: 'https://apps.apple.com/us/app/melodyia-ai-song-creator/id6789874711',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.melodyyazilim.songcreator',
    },
    brand: { accent: '#c6ff38', glow: '#3154f5', splash: '#050505', splashInk: '#c6ff38' },
    icon: asset('melodyia', 'icon.png'),
    phone: { screens: series('melodyia', 'screen') },
    store: series('melodyia', 'store'),
    heroOrbit: true,
  },
  {
    id: 'memora',
    name: 'Memora',
    shortName: 'Memora',
    category: 'AI photo enhancer',
    year: '2026',
    period: 'Apr 2026 – now',
    company: 'Melody Yazılım · via Appik',
    role: 'Sole Flutter developer',
    summary:
      'Restores, colorizes, enhances and retouches photos with AI, with a before/after slider to compare. Photos come from the gallery or a built-in document scanner.',
    highlights: [
      'Queue-based generation pipeline: polling, timeouts, pause and resume with the app lifecycle',
      'Credits wallet, subscriptions, credit packs and rewarded-ad unlocks',
      'OneSignal push with a native Swift Notification Service Extension',
      'Themed with mihr_ui, my own open-source design system; 10 languages',
    ],
    metric: {
      value: '5K+',
      label: 'downloads on Google Play',
      source: 'Google Play listing badge, checked 2026-10-09',
    },
    tech: ['Flutter', 'Clean Architecture', 'Firebase', 'OneSignal', 'AdMob', 'StoreKit & Play Billing'],
    status: 'live',
    statusLabel: 'Live · launched Jun 2026',
    links: {
      appStore: 'https://apps.apple.com/us/app/memora-ai-photo-enhancer/id6766814076',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.melodyyazilim.memora',
    },
    brand: { accent: '#a48cff', glow: '#6d4cff', splash: '#101828', splashInk: '#f3f1ec' },
    icon: asset('memora', 'icon.png'),
    phone: { screens: series('memora', 'screen') },
    store: series('memora', 'store'),
    heroOrbit: true,
  },
  {
    id: 'sleepia',
    name: 'Sleepia',
    shortName: 'Sleepia',
    category: 'Sleep sounds & sleep tracking',
    year: '2026',
    period: 'Apr 2026 – now',
    company: 'Melody Yazılım · via Appik',
    role: 'Flutter developer',
    summary:
      'Sleep sounds, a layered mixer and AI-generated soundscapes — plus sleep tracking that listens through the night, detects snoring and sleep talk on the device, and builds a report you can play back in the morning.',
    highlights: [
      'On-device sound classifier (YAMNet embeddings + a custom head I trained) running in a worker isolate',
      'Morning report with sleep score, night timeline and playable clips; week and month insights',
      'Adaptive Sound, streaks and badges, offline library and bedtime reminders',
      'Took over in April 2026 and shipped the first store release; sole committer since June',
    ],
    metric: {
      value: '50K+',
      label: 'downloads on Google Play',
      source: 'Google Play listing badge, checked 2026-10-09',
    },
    tech: ['Flutter', 'TensorFlow Lite', 'just_audio', 'Foreground service', 'Firebase', 'StoreKit & Play Billing'],
    status: 'live',
    statusLabel: 'Live · launched Apr 2026',
    links: {
      appStore: 'https://apps.apple.com/us/app/sleepia-sleep-sounds-relaxing/id6761693131',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.melody.sleepia',
    },
    brand: { accent: '#c6b8ff', glow: '#7e65d6', splash: '#170f38', splashInk: '#f1f0f5' },
    icon: asset('sleepia', 'icon.png'),
    phone: {
      video: { src: '/media/sleepia/player.mp4', poster: asset('sleepia', 'poster.webp') },
      screens: series('sleepia', 'screen'),
      statusBar: true,
    },
    store: series('sleepia', 'store'),
    reel: { src: '/media/sleepia/reel.mp4', label: 'Watch the 1.1 release reel' },
    heroOrbit: true,
  },
  {
    id: 'commnia',
    name: 'Commnia',
    shortName: 'Commnia',
    category: 'Construction management platform',
    year: '2025',
    period: 'Apr 2025 – Feb 2026',
    company: 'Commnia (Australia) · via Larsca',
    role: 'Flutter developer',
    summary:
      'An Australian construction-management platform for site and project teams — documents, defects, forms and site diaries on phone, tablet and web. I owned whole modules end to end across mobile, iPad and web.',
    highlights: [
      'NIA AI assistant: OpenAI Responses API + Gemini, streaming, token counting and automatic context summarization',
      'Project Register, QR Sign-On and Project Inbox — built from scratch',
      'Shared component library and data-service mixins adopted by the team',
      'Google Maps polygon editing & geofencing, Dropbox, Azure Pipelines CI/CD',
    ],
    tech: ['Flutter', 'iPad & web', 'OpenAI', 'Gemini', 'Google Maps', 'Azure Pipelines'],
    status: 'live',
    statusLabel: 'Live',
    links: {
      appStore: 'https://apps.apple.com/app/commnia-construction-manager/id1635068701',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.commnia.commniamobile',
    },
    brand: { accent: '#ff8a4c', glow: '#ff671d', splash: '#ffffff', splashInk: '#1d1d1f' },
    icon: asset('commnia', 'icon.png'),
    phone: { screens: [] },
    store: series('commnia', 'store'),
    heroOrbit: true,
  },
  {
    id: 'dudolive',
    name: 'DudoLive',
    shortName: 'DudoLive',
    category: 'Live streaming',
    year: '2024',
    period: 'Jul 2024 – Mar 2025',
    company: 'Artussu Teknoloji',
    role: 'Flutter developer',
    summary:
      'A live-streaming social app with video and audio rooms, gifts and coins, PK battles between streamers and guest hosts. I was hired to make it fast and keep it maintainable.',
    highlights: [
      'Profiled GPU pressure and state churn around the streaming SDK with Flutter DevTools and cut the jank',
      'Real-time rooms: Agora for video and audio, Socket.IO for room events',
      'Drove the codebase toward a modular core / product / feature structure',
    ],
    tech: ['Flutter', 'Agora', 'Socket.IO', 'Firebase', 'RevenueCat', 'OneSignal'],
    status: 'retired',
    statusLabel: 'No longer on the stores',
    links: {},
    brand: { accent: '#e15cf5', glow: '#b03ad6', splash: '#120a1c', splashInk: '#ffffff' },
    icon: asset('dudolive', 'icon.png'),
    phone: { screens: [] },
    store: series('dudolive', 'store'),
  },
  {
    id: 'dostoom',
    name: 'Dostoom',
    shortName: 'Dostoom',
    category: 'Pet supplies e-commerce',
    year: '2023',
    period: 'Oct 2023 – Feb 2024',
    company: 'Regant+ / Inflero',
    role: 'Flutter developer',
    summary:
      'A pet-supplies store for Azerbaijan: browse by category, open a product, keep favorites and order to your door. One of the client apps I built UIs for at Regant+.',
    highlights: [
      'Production UIs built from the design files, with REST integration',
      'Also shipped UIs for Inflero’s business software and DoggyHush',
    ],
    tech: ['Flutter', 'REST', 'Figma to Flutter'],
    status: 'live',
    statusLabel: 'On the App Store since 2025',
    note: 'Screens: the App Store release from May 2025, after my time on the project.',
    links: {
      appStore: 'https://apps.apple.com/app/dostoom/id6745411708',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.zhareef.fictiondevelopers',
    },
    brand: { accent: '#9a8cff', glow: '#786aff', splash: '#ffffff', splashInk: '#6d5cf6' },
    icon: asset('dostoom', 'icon.png'),
    phone: { screens: series('dostoom', 'screen') },
    store: [],
  },
  {
    id: 'voco',
    name: 'Voco',
    shortName: 'Voco',
    category: 'Social discovery',
    year: '2023',
    period: 'Jan – Sep 2023',
    company: 'Voco Teknoloji',
    role: 'Flutter developer',
    summary:
      'A social app for meeting people around shared plans: discover activities nearby, join one or post your own. I was the most active developer on the app through 2023.',
    highlights: [
      '500+ commits in nine months — the most of anyone on the codebase',
      'Activity creation and discovery with maps, social feed, profiles and real-time messaging',
      'Moved features onto a layered architecture (data · domain · presentation), with tests for the repository layer',
      'Regular TestFlight and store releases',
    ],
    tech: ['Flutter', 'Clean Architecture', 'Socket.IO', 'Firebase', 'Google Maps', 'RevenueCat'],
    status: 'live',
    statusLabel: 'Live',
    links: {
      appStore: 'https://apps.apple.com/app/id1576261314',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.vocoapp.com',
    },
    note: 'Screenshots: the App Store listing in March 2023, while I was on the team.',
    brand: { accent: '#5aa9ff', glow: '#2f6bff', splash: '#05070d', splashInk: '#ffffff' },
    icon: asset('voco', 'icon.png'),
    phone: { screens: [] },
    store: series('voco', 'store'),
  },
  {
    id: 'sportvy',
    name: 'Sportvy',
    shortName: 'Sportvy',
    category: 'Sports-partner matching · now Lolovy',
    year: '2022',
    period: 'Aug – Nov 2022',
    company: 'Sportvy Teknoloji · freelance',
    role: 'Sole developer',
    summary:
      'Find people who play the same sports: pick your sports, choose who you want to meet by gender, age and distance, then swipe through people nearby and chat when you match. I built the first version as the only developer.',
    highlights: [
      'Sign-up with phone verification, sport picker and match preferences',
      'Swipe cards with like and dislike, location-based discovery and chat',
      'Integration with the C# / MS SQL backend',
      'From the first screen to the App Store and Google Play in about three months',
    ],
    tech: ['Flutter', 'C#', 'MS SQL'],
    status: 'live',
    statusLabel: 'Live today as Lolovy',
    links: { appStore: 'https://apps.apple.com/app/id1642513649' },
    brand: { accent: '#f43f6b', glow: '#be123c', splash: '#ffffff', splashInk: '#111111' },
    icon: asset('sportvy', 'icon.png'),
    phone: { screens: series('sportvy', 'screen') },
    store: [],
  },
  {
    id: 'reposti',
    name: 'Reposti',
    shortName: 'Reposti',
    category: 'Repost for Instagram',
    year: '2022',
    period: 'Mar – Aug 2022',
    company: 'Squamobi',
    role: 'Flutter developer · main author',
    summary:
      'Repost photos, videos, Reels and IGTV from Instagram: paste a link, place a credit badge, copy the caption and post — now or on a schedule.',
    highlights: [
      'My main project at Squamobi — I wrote nearly all of its code',
      'Link-to-media flow for posts, carousels, Reels and IGTV',
      'Scheduled reposts with reminders, credit badges and alternate app icons',
      'Paywall with a free trial, plus rewarded and banner ads',
    ],
    tech: ['Flutter', 'Hive', 'RevenueCat', 'Local notifications', 'Ads'],
    status: 'retired',
    statusLabel: 'No longer on the stores',
    links: {},
    brand: { accent: '#ff4fa3', glow: '#d6247f', splash: '#000000', splashInk: '#ffffff' },
    icon: asset('reposti', 'icon.png'),
    phone: { screens: series('reposti', 'screen') },
    store: series('reposti', 'store'),
  },
  {
    id: 'nabu',
    name: 'Nabu',
    shortName: 'Nabu',
    category: 'Daily quotes',
    year: '2022',
    period: 'Mar – Aug 2022',
    company: 'Squamobi',
    role: 'Flutter developer (team)',
    summary:
      'Daily quotes with themes and categories: save favorites, add your own backgrounds and share a quote as a story or post.',
    highlights: [
      'Share page and share actions; reminders with a camera dialog',
      'Rebuilt the main carousel and category pages',
      'Intro flow and paywall',
    ],
    tech: ['Flutter', 'Bloc', 'Firebase'],
    status: 'retired',
    statusLabel: 'No longer on the stores',
    links: {},
    brand: { accent: '#8b8cf7', glow: '#5b5bd6', splash: '#000010', splashInk: '#ffffff' },
    icon: asset('nabu', 'icon.png'),
    phone: { screens: series('nabu', 'screen'), fit: 'contain' },
    store: series('nabu', 'store'),
  },
  {
    id: 'muslim-guide',
    name: 'Muslim Guide',
    shortName: 'Muslim Guide',
    category: 'Prayer times & daily verses',
    year: '2022',
    period: 'Feb – Jul 2022',
    company: 'Squamobi',
    role: 'Flutter developer (team)',
    summary:
      'Prayer times for your location, daily verses and hadiths to save and share, and a step-by-step guide to prayer.',
    highlights: [
      'Location finder and the prayer-times screen',
      'Share & edit screen: drag text over an image, then save or share it as a story or post',
      'Intro and paywall screens',
    ],
    tech: ['Flutter', 'Provider', 'Firebase'],
    status: 'retired',
    statusLabel: 'No longer on the stores',
    links: {},
    brand: { accent: '#3ccf8e', glow: '#0e8a4a', splash: '#0b6b38', splashInk: '#ffffff' },
    icon: asset('muslim-guide', 'icon.png'),
    phone: { screens: series('muslim-guide', 'screen'), fit: 'contain' },
    store: series('muslim-guide', 'store'),
  },
  {
    id: 'daily-hadith',
    name: 'Daily Hadith & Qibla',
    shortName: 'Daily Hadith',
    category: 'Daily hadith + Qibla compass',
    year: '2022',
    period: 'Feb – Jul 2022',
    company: 'Squamobi',
    role: 'Flutter developer (team)',
    summary:
      'Two apps in one: daily hadith cards and a Qibla compass, one tap apart. Share any hadith as a story or post over nearly 90 backgrounds, and get a reminder at the time you choose.',
    highlights: [
      'Share flow: export a hadith as a story or post with custom backgrounds',
      'Reminders, rating and feedback dialogs, paywall and ads',
      'Double-tap to like, categories and the Qibla header',
    ],
    tech: ['Flutter', 'Bloc', 'Firebase', 'AdMob'],
    status: 'retired',
    statusLabel: 'No longer on the stores',
    links: {},
    brand: { accent: '#4fd1c5', glow: '#1fa98b', splash: '#2fb68a', splashInk: '#ffffff' },
    icon: asset('daily-hadith', 'icon.png'),
    phone: { screens: series('daily-hadith', 'screen'), fit: 'contain' },
    store: series('daily-hadith', 'store'),
  },
];

/* Companies and clients I have built apps for — shown in the hero strip. */
export const clients = [
  'Commnia',
  'Melody Yazılım',
  'Appik',
  'Kırmızıtaşlar',
  'DudoLive',
  'Regant+',
  'Voco',
  'Squamobi',
  'Sportvy',
  'Inflero',
];

export const appsById = Object.fromEntries(apps.map((a) => [a.id, a]));

/** Screenshots for the gallery: store images when there are any, otherwise the raw screens. */
export const galleryOf = (app: AppEntry): ImageMetadata[] => (app.store.length ? app.store : app.phone.screens);
export { optional as optionalAsset };
