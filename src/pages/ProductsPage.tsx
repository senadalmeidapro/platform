import { useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { CTASection } from '../components/CTASection';
import { ProductCard } from '../components/ContentSections';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { t } from '../content';
import { productCategories, products } from '../data/catalog';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const selectedCategory = searchParams.get('category') ?? 'all';

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const searchable =
        `${t(product.title)} ${t(product.description)} ${t(`products.categories.${product.category}`)}`.toLowerCase();
      return matchesCategory && searchable.includes(needle);
    });
  }, [query, selectedCategory]);

  const reset = () => {
    setSearchParams({});
    setQuery('');
  };

  return (
    <>
      <PageMeta description="meta.products.description" title="meta.products.title" />
      <PageHeader
        description={t('products.description')}
        title={t('products.title')}
        trail={[{ label: 'nav.products' }]}
      />

      <section className="section">
        <div className="container">
          <div className="toolbar">
            <div
              aria-label={t('products.filterByCategory')}
              className="chips chips--scroll"
              role="group"
            >
              <button
                className={`chip ${selectedCategory === 'all' ? 'is-selected' : ''}`}
                onClick={() => setSearchParams({})}
                type="button"
              >
                {t('common.all')}
              </button>
              {productCategories.map((category) => (
                <button
                  className={`chip ${selectedCategory === category ? 'is-selected' : ''}`}
                  key={category}
                  onClick={() => setSearchParams({ category })}
                  type="button"
                >
                  {t(`products.categories.${category}`)}
                </button>
              ))}
            </div>
            <label className="search">
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
            <div className="grid grid--3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search aria-hidden="true" size={26} />
              <h2>{t('products.emptyTitle')}</h2>
              <p>{t('products.emptyDescription')}</p>
              <button className="link" onClick={reset} type="button">
                {t('products.clearFilters')}
              </button>
            </div>
          )}

          <p className="note">
            <Info aria-hidden="true" size={18} />
            <span>
              {t('products.demoNote')}{' '}
              <Link className="link" to="/request-quote">
                {t('products.askForEquipment')}
              </Link>
            </span>
          </p>
        </div>
      </section>

      <CTASection description="products.cta.description" title="products.cta.title" />
    </>
  );
}
