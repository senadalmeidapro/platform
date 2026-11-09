import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { productCategories, products } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { ProductCard } from '../components/ContentSections';
import { PageMeta } from '../components/PageMeta';

export function ProductsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const selectedCategory = searchParams.get('category') ?? 'all';
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const searchable =
          `${t(product.title)} ${t(product.description)} ${t(`products.categories.${product.category}`)}`.toLowerCase();
        return matchesCategory && searchable.includes(query.trim().toLowerCase());
      }),
    [query, selectedCategory, t],
  );

  return (
    <>
      <PageMeta description="meta.products.description" title="meta.products.title" />
      <section className="page-masthead page-masthead--products">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('products.kicker')}</p>
            <h1>{t('products.title')}</h1>
            <p>{t('products.description')}</p>
          </div>
        </div>
      </section>
      <section className="section catalogue-section">
        <div className="container">
          <div className="catalogue-notice">
            <span className="catalogue-notice__icon">
              <SlidersHorizontal size={19} />
            </span>
            <p>{t('products.demoNote')}</p>
            <Link to="/request-quote">
              {t('products.askForEquipment')}
              <span>↗</span>
            </Link>
          </div>
          <div className="catalogue-controls">
            <div
              aria-label={t('products.filterByCategory')}
              className="category-filters"
              role="group"
            >
              <button
                className={selectedCategory === 'all' ? 'is-selected' : ''}
                onClick={() => setSearchParams({})}
                type="button"
              >
                {t('common.all')}
              </button>
              {productCategories.map((category) => (
                <button
                  className={selectedCategory === category ? 'is-selected' : ''}
                  key={category}
                  onClick={() => setSearchParams({ category })}
                  type="button"
                >
                  {t(`products.categories.${category}`)}
                </button>
              ))}
            </div>
            <label className="catalogue-search">
              <Search aria-hidden="true" size={18} />
              <span className="sr-only">{t('products.searchLabel')}</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('products.searchPlaceholder')}
                type="search"
                value={query}
              />
            </label>
          </div>
          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={24} />
              <h2>{t('products.emptyTitle')}</h2>
              <p>{t('products.emptyDescription')}</p>
              <button
                className="text-link-button"
                onClick={() => {
                  setSearchParams({});
                  setQuery('');
                }}
                type="button"
              >
                {t('products.clearFilters')}
              </button>
            </div>
          )}
        </div>
      </section>
      <CTASection description="products.cta.description" title="products.cta.title" />
    </>
  );
}
