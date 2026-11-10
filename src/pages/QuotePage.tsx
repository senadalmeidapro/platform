import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { LeadForm } from '../components/LeadForm';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { t } from '../content';
import { products, services } from '../data/catalog';

export function QuotePage() {
  const [searchParams] = useSearchParams();
  const product = products.find((item) => item.id === searchParams.get('product'));
  const service = services.find((item) => item.slug === searchParams.get('service'));
  const selected = product
    ? t(product.title)
    : service
      ? t(`services.items.${service.id}.title`)
      : '';

  return (
    <>
      <PageMeta description="meta.quote.description" title="meta.quote.title" />
      <PageHeader
        description={t('quote.description')}
        title={t('quote.title')}
        trail={[{ label: 'nav.requestQuote' }]}
      />

      <section className="section">
        <div className="container form-layout">
          <aside className="aside">
            <Link className="back-link" to="/services">
              <ArrowLeft aria-hidden="true" size={16} />
              {t('common.backToServices')}
            </Link>
            <h2>{t('quote.asideTitle')}</h2>
            <p>{t('quote.asideDescription')}</p>
            <ul className="check-list">
              {[0, 1, 2].map((index) => (
                <li key={index}>
                  <span>
                    <BadgeCheck aria-hidden="true" size={14} />
                  </span>
                  {t(`quote.expectations.${index}`)}
                </li>
              ))}
            </ul>
            {selected && (
              <div className="context-card">
                <small>{t('quote.selectedRequest')}</small>
                <strong>{selected}</strong>
              </div>
            )}
            <p className="small-print">{t('quote.privacyNote')}</p>
          </aside>

          <div className="panel">
            <LeadForm
              initialProduct={product?.category ?? ''}
              initialService={service?.slug ?? ''}
              mode="quote"
            />
          </div>
        </div>
      </section>
    </>
  );
}
