export const localeMetadata: Record<string, { name: string; emoji: string; flagUrl: string }> = {
  en: {
    name: 'English',
    emoji: '🇺🇸',
    flagUrl: 'https://flagcdn.com/us.svg',
  },
  hi: {
    name: 'हिन्दी',
    emoji: '🇮🇳',
    flagUrl: 'https://flagcdn.com/in.svg',
  },
  bn: {
    name: 'বাংলা',
    emoji: '🇧🇩',
    flagUrl: 'https://flagcdn.com/bd.svg',
  },
  ja: {
    name: '日本語',
    emoji: '🇯🇵',
    flagUrl: 'https://flagcdn.com/jp.svg',
  },
  de: {
    name: 'Deutsch',
    emoji: '🇩🇪',
    flagUrl: 'https://flagcdn.com/de.svg',
  },
};

export const availableLocales = Object.keys(localeMetadata);
