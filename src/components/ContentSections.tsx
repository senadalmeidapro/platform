import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { t } from '../content';
import type { Product, Service } from '../data/catalog';
import { ImageFrame } from './ImageFrame';
import { ServiceIcon } from './ServiceIcon';

export function ServiceCard({ service }: { service: Service }) {
  const title = t(`services.items.${service.id}.title`);
  return (
    <article className="card service-card">
      <span className="icon-box">
        <ServiceIcon name={service.icon} />
      </span>
      <h3>{title}</h3>
      <p>{t(`services.items.${service.id}.short`)}</p>
      <Link
        aria-label={`${t('common.learnMore')} : ${title}`}
        className="link"
        to={`/services/${service.slug}`}
      >
        {t('common.learnMore')} <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}

export function FaqList({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="faq">
      {items.map((item, index) => (
        <details className="faq__item" key={item.question} open={index === 0}>
          <summary>
            {t(item.question)}
            <ChevronDown aria-hidden="true" size={20} />
          </summary>
          <p>{t(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const href = `/request-quote?product=${product.id}`;
  return (
    <article className="card product-card">
      <Link
        aria-label={`${t('common.requestInformation')} : ${t(product.title)}`}
        className="product-card__media"
        to={href}
      >
        <ImageFrame alt={t(`productImages.${product.category}`)} src={product.image} />
        <span className="product-card__tag">{t('products.demoLabel')}</span>
      </Link>
      <div className="product-card__body">
        <p className="product-card__category">{t(`products.categories.${product.category}`)}</p>
        <h3>{t(product.title)}</h3>
        <p>{t(product.description)}</p>
        <Link className="link" to={href}>
          {t('common.requestInformation')} <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </article>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((key) => (
        <li key={key}>
          <span>
            <Check aria-hidden="true" size={13} strokeWidth={3} />
          </span>
          {t(key)}
        </li>
      ))}
    </ul>
  );
}
