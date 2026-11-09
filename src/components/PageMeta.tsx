import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { company } from '../config/company';

export function PageMeta({ title, description }: { title: string; description: string }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const pageTitle = `${t(title)} | ${company.name}`;
    const pageDescription = t(description);
    document.title = pageTitle;

    const setMeta = (
      selector: string,
      attribute: 'name' | 'property',
      key: string,
      content: string,
    ) => {
      let tag = document.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = content;
    };

    setMeta('meta[name="description"]', 'name', 'description', pageDescription);
    setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', pageDescription);
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, i18n.resolvedLanguage, t, title]);

  return null;
}
