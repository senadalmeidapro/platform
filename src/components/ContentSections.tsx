import { ArrowUpRight, Check, ChevronDown, PackageCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { Product, Service } from '../data/catalog';
import { ServiceIcon } from './ServiceIcon';
import { ImageFrame } from './ImageFrame';

export function ServiceCard({
  service,
  featured = false,
  index = 0,
}: {
  service: Service;
  featured?: boolean;
  index?: number;
}) {
  const { t } = useTranslation();
  return (
    <article className={`service-card ${featured ? 'service-card--featured' : ''}`}>
      {featured && (
        <ImageFrame
          alt={t(`services.items.${service.id}.imageAlt`)}
          className="service-card__image"
          src={service.image}
        />
      )}
      <div className="service-card__body">
        <div className="service-card__topline">
          <span className="service-card__icon">
            <ServiceIcon name={service.icon} />
          </span>
          <span className="service-card__index">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3>{t(`services.items.${service.id}.title`)}</h3>
        <p>{t(`services.items.${service.id}.short`)}</p>
        <Link
          aria-label={`${t('common.learnMore')}: ${t(`services.items.${service.id}.title`)}`}
          className="service-card__link"
          to={`/services/${service.slug}`}
        >
          {t('common.learnMore')} <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  );
}

export function FaqList({
  items,
  className = '',
}: {
  items: Array<{ question: string; answer: string }>;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className={`faq-list ${className}`}>
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} open={index === 0}>
          <summary>
            {t(item.question)}
            <ChevronDown aria-hidden="true" size={19} />
          </summary>
          <p>{t(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  return (
    <article className="product-card">
      <Link
        aria-label={`${t('common.requestInformation')}: ${t(product.title)}`}
        className="product-card__image"
        to={`/request-quote?product=${product.id}`}
      >
        <ImageFrame alt={t(`productImages.${product.category}`)} src={product.image} />
        <span className="product-card__demo">
          <PackageCheck aria-hidden="true" size={13} />
          {t('products.demoLabel')}
        </span>
      </Link>
      <div className="product-card__body">
        <p className="product-card__category">{t(`products.categories.${product.category}`)}</p>
        <h3>{t(product.title)}</h3>
        <p>{t(product.description)}</p>
        <Link className="product-card__link" to={`/request-quote?product=${product.id}`}>
          {t('common.requestInformation')} <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}

export function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  const { t } = useTranslation();
  return (
    <ul className={`check-list ${className}`}>
      {items.map((key) => (
        <li key={key}>
          <span>
            <Check aria-hidden="true" size={14} />
          </span>
          {t(key)}
        </li>
      ))}
    </ul>
  );
}
