import { useEffect, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, type Language } from '../i18n';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const language = (i18n.resolvedLanguage ?? i18n.language).split('-')[0] as Language;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  async function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLanguage = event.target.value as Language;
    await i18n.changeLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Language switching remains available when browser storage is disabled.
    }
  }

  return (
    <label className="language-selector">
      <span>{t('language.label')}</span>
      <select
        aria-label={t('language.label')}
        className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-900"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value={SUPPORTED_LANGUAGES[0]}>{t('language.french')}</option>
        <option value={SUPPORTED_LANGUAGES[1]}>{t('language.english')}</option>
      </select>
    </label>
  );
}
