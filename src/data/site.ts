export const site = {
  name: 'Muhammed Raşit Yılmaz',
  shortName: 'Raşit Yılmaz',
  role: 'Flutter Developer',
  domain: 'devrasityilmaz.com',
  url: 'https://devrasityilmaz.com',
  location: 'Istanbul, Türkiye',
  email: 'info@devrasityilmaz.com',
  description:
    'Muhammed Raşit Yılmaz is a Flutter developer in Istanbul who designs, builds and ships mobile apps to the App Store and Google Play — from AI-powered consumer apps to enterprise platforms.',
  social: {
    github: 'https://github.com/mrasityilmaz',
    linkedin: 'https://www.linkedin.com/in/mrasityilmaz-1998',
  },
} as const;

export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
