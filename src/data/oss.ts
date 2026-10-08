/* Open-source work. Numbers checked on 2026-10-08 against pub.dev, the VS Code
   Marketplace and the GitHub API. */

export interface OssItem {
  id: string;
  name: string;
  kind: string;
  blurb: string;
  facts: string[];
  links: { label: string; href: string }[];
}

export const oss: OssItem[] = [
  {
    id: 'mihr-ui',
    name: 'Mihr UI',
    kind: 'Flutter design system · pub.dev',
    blurb:
      'Change one seed color and your whole Flutter app follows. Design tokens, semantic ThemeExtensions, automatic light and dark themes, WCAG-checked palettes and ready-made components.',
    facts: ['160 / 160 pub points', '30 palettes × 12 shades', 'Light & dark from one seed'],
    links: [
      { label: 'Docs', href: 'https://mihrui.devrasityilmaz.com' },
      { label: 'pub.dev', href: 'https://pub.dev/packages/mihr_ui' },
      { label: 'GitHub', href: 'https://github.com/mrasityilmaz/mihr_ui' },
    ],
  },
  {
    id: 'store-studio',
    name: 'store-studio',
    kind: 'Claude Code plugin · MIT',
    blurb:
      'Manage App Store Connect and Google Play from a Claude Code chat: screenshots and store text for every locale, builds, staged rollouts, TestFlight and reviews — with a dry run before every change.',
    facts: ['25 MCP tools', '4 skills', 'Zero dependencies'],
    links: [{ label: 'GitHub', href: 'https://github.com/mrasityilmaz/store-studio' }],
  },
  {
    id: 'assets-gen',
    name: 'Flutter Assets Dart Generator',
    kind: 'VS Code extension',
    blurb: 'One command turns your assets folder into a typed Dart class, so asset paths are checked by the compiler instead of failing at runtime.',
    facts: ['TypeScript', 'VS Code Marketplace'],
    links: [
      { label: 'Marketplace', href: 'https://marketplace.visualstudio.com/items?itemName=devmrasityilmaz.flutter-assets-gen' },
      { label: 'GitHub', href: 'https://github.com/mrasityilmaz/flutter-assets-generator' },
    ],
  },
  {
    id: 'system-status',
    name: 'system_status',
    kind: 'Federated Flutter plugin · pub.dev',
    blurb: 'Live macOS system stats — CPU, battery health, disk and memory — through a platform interface with a native Swift implementation.',
    facts: ['150 / 160 pub points', 'Swift + platform channels'],
    links: [
      { label: 'pub.dev', href: 'https://pub.dev/packages/system_status' },
      { label: 'GitHub', href: 'https://github.com/mrasityilmaz/system_status_plugin' },
    ],
  },
];

export const caseStudies = [
  {
    name: 'Nodelabs',
    year: '2025',
    note: 'Movie discovery app · Bloc, formz, EN/TR',
    href: 'https://github.com/mrasityilmaz/nodelabs_case',
  },
  {
    name: 'Teklifim Gelsin',
    year: '2024',
    note: 'Loan offers · concurrent requests to the real API',
    href: 'https://github.com/mrasityilmaz/teklifimgelsin-case',
  },
  {
    name: 'Petfinder',
    year: '2023',
    note: 'Dog breeds browser · Bloc, auto_route',
    href: 'https://github.com/mrasityilmaz/petfinder_case',
  },
  {
    name: 'Socialize',
    year: '2023',
    note: 'Social feed · Provider, Firebase, tests',
    href: 'https://github.com/mrasityilmaz/socialize-case',
  },
];
