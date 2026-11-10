import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { FaqList } from '../components/ContentSections';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { t } from '../content';
import { faqItems } from '../data/catalog';

const faqCategories = [
  'all',
  'general',
  'maintenance',
  'installation',
  'security',
  'products',
] as const;

export function FAQPage() {
  const [category, setCategory] = useState<(typeof faqCategories)[number]>('all');
  const [query, setQuery] = useState('');
  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return faqItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      return (
        matchesCategory && `${t(item.question)} ${t(item.answer)}`.toLowerCase().includes(needle)
      );
    });
  }, [category, query]);

  return (
    <>
      <PageMeta description="meta.faq.description" title="meta.faq.title" />
      <PageHeader
        description={t('faq.description')}
        title={t('faq.title')}
        trail={[{ label: 'nav.faq' }]}
      />

      <section className="section">
        <div className="container faq-layout">
          <aside className="faq-side">
            <label className="search">
              <Search aria-hidden="true" size={18} />
              <span className="sr-only">{t('faq.searchLabel')}</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('faq.searchPlaceholder')}
                type="search"
                value={query}
              />
            </label>
            <nav aria-label={t('faq.categoriesLabel')}>
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
          <div>
            <p className="results-count">{t('faq.resultCount', { count: items.length })}</p>
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
