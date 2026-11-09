import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { products, services } from '../data/catalog';
import { LeadForm } from '../components/LeadForm';
import { PageMeta } from '../components/PageMeta';

export function QuotePage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product') ?? '';
  const product = products.find((item) => item.id === productId);
  const serviceSlug = searchParams.get('service') ?? '';
  const service = services.find((item) => item.slug === serviceSlug);
  return (
    <>
      <PageMeta description="meta.quote.description" title="meta.quote.title" />
      <section className="page-masthead page-masthead--quote">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('quote.kicker')}</p>
            <h1>{t('quote.title')}</h1>
            <p>{t('quote.description')}</p>
          </div>
        </div>
      </section>
      <section className="section quote-section">
        <div className="container quote-section__layout">
          <aside className="quote-aside">
            <Link className="back-link" to="/services">
              <ArrowLeft size={16} />
              {t('common.backToServices')}
            </Link>
            <h2>{t('quote.asideTitle')}</h2>
            <p>{t('quote.asideDescription')}</p>
            <ul>
              {[0, 1, 2].map((index) => (
                <li key={index}>
                  <BadgeCheck size={18} />
                  {t(`quote.expectations.${index}`)}
                </li>
              ))}
            </ul>
            {(product || service) && (
              <div className="quote-context">
                <small>{t('quote.selectedRequest')}</small>
                <strong>
                  {product
                    ? t(product.title)
                    : service
                      ? t(`services.items.${service.id}.title`)
                      : ''}
                </strong>
              </div>
            )}
            <p className="quote-privacy">{t('quote.privacyNote')}</p>
          </aside>
          <div className="quote-form-panel">
            <LeadForm
              initialService={service?.slug ?? ''}
              initialProduct={product?.category ?? ''}
              mode="quote"
            />
          </div>
        </div>
      </section>
    </>
  );
}
