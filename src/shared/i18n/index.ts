import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from '../../locales/en/translation.json';
import french from '../../locales/fr/translation.json';
import { siteTranslations } from '../../locales/site';

export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'fr';
export const LANGUAGE_STORAGE_KEY = 'platform.language';

function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.entries(value).reduce<Record<string, string>>((result, [key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof child === 'string') result[path] = child;
    else Object.assign(result, flatten(child, path));
    return result;
  }, {});
}

const resources = {
  fr: { translation: { ...flatten(french), ...siteTranslations('fr') } },
  en: { translation: { ...flatten(english), ...siteTranslations('en') } },
};

function getInitialLanguage(): Language {
  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return SUPPORTED_LANGUAGES.find((language) => language === storedLanguage) ?? DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  supportedLngs: [...SUPPORTED_LANGUAGES],
  defaultNS: 'translation',
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;
