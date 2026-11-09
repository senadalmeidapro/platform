import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { faqItems } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { FaqList } from '../components/ContentSections';
import { PageMeta } from '../components/PageMeta';

const faqCategories = [
  'all',
  'general',
  'maintenance',
  'installation',
  'security',
  'products',
] as const;

export function FAQPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<(typeof faqCategories)[number]>('all');
  const [query, setQuery] = useState('');
  const items = useMemo(
    () =>
      faqItems.filter((item) => {
        const matchesCategory = category === 'all' || item.category === category;
        const content = `${t(item.question)} ${t(item.answer)}`.toLowerCase();
        return matchesCategory && content.includes(query.trim().toLowerCase());
      }),
    [category, query, t],
  );

  return (
    <>
      <PageMeta description="meta.faq.description" title="meta.faq.title" />
      <section className="page-masthead page-masthead--faq">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('faq.kicker')}</p>
            <h1>{t('faq.title')}</h1>
            <p>{t('faq.description')}</p>
          </div>
        </div>
      </section>
      <section className="section faq-page">
        <div className="container faq-page__layout">
          <aside className="faq-sidebar">
            <label className="faq-search">
              <Search size={18} />
              <span className="sr-only">{t('faq.searchLabel')}</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                value={query}
              />
            </label>
            <nav aria-label={t('faq.categoriesLabel')} className="faq-categories">
              {faqCategories.map((key) => (
                <button
                  aria-pressed={category === key}
                  className={category === key ? 'is-selected' : ''}
                  key={key}
                  onClick={() => setCategory(key)}
                  type="button"
                >
                  {t(`faq.categories.${key}`)}
                </button>
              ))}
            </nav>
          </aside>
          <div className="faq-results">
            <p className="faq-results__count">{t('faq.resultCount', { count: items.length })}</p>
            {items.length ? (
              <FaqList items={items} />
            ) : (
              <div className="empty-state">
                <h2>{t('faq.emptyTitle')}</h2>
                <p>{t('faq.emptyDescription')}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CTASection description="faq.cta.description" title="faq.cta.title" />
    </>
  );
}
