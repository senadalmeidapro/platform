import { useEffect } from 'react';
import { company } from '../config/company';
import { t } from '../content';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }
  tag.content = content;
}

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const pageTitle = `${t(title)} | ${company.name}`;
    const pageDescription = t(description);
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = pageTitle;
    setMeta('name', 'description', pageDescription);
    setMeta('property', 'og:title', pageTitle);
    setMeta('property', 'og:description', pageDescription);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', canonicalUrl);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, title]);

  return null;
}
