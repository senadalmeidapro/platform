import { ArrowUpRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { services } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { CheckList, FaqList, ServiceCard } from '../components/ContentSections';
import { ImageFrame } from '../components/ImageFrame';
import { ServiceIcon } from '../components/ServiceIcon';
import { NotFoundPage } from './NotFoundPage';
import { PageMeta } from '../components/PageMeta';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;
  const titleKey = `services.items.${service.id}.title`;

  return (
    <>
      <PageMeta
        description={`services.items.${service.id}.seoDescription`}
        title={`services.items.${service.id}.seoTitle`}
      />
      <section className="detail-hero">
        <div className="container">
          <div className="detail-hero__layout">
            <div className="detail-hero__copy">
              <span className="detail-hero__icon">
                <ServiceIcon name={service.icon} />
              </span>
              <p className="eyebrow">{t(`services.items.${service.id}.kicker`)}</p>
              <h1>{t(titleKey)}</h1>
              <p>{t(`services.items.${service.id}.long`)}</p>
              <Link
                className="button button--primary button--large"
                to={`/request-quote?service=${service.slug}`}
              >
                {t('nav.requestQuote')}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <div className="detail-hero__visual">
              <ImageFrame
                alt={t(`services.items.${service.id}.imageAlt`)}
                className="detail-hero__image"
                src={service.image}
              />
              <span className="detail-hero__image-caption">
                {t(`services.items.${service.id}.imageCaption`)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="section detail-overview">
        <div className="container detail-overview__layout">
          <div>
            <p className="eyebrow">{t('serviceDetail.scopeKicker')}</p>
            <h2>{t(`services.items.${service.id}.scopeTitle`)}</h2>
            <p className="body-lead">{t(`services.items.${service.id}.scopeIntro`)}</p>
          </div>
          <CheckList items={service.scopes} className="detail-checklist" />
        </div>
      </section>
      <section className="section detail-technology">
        <div className="container detail-technology__layout">
          <div>
            <p className="eyebrow">{t('serviceDetail.environmentKicker')}</p>
            <h2>{t(`services.items.${service.id}.technologyTitle`)}</h2>
            <p>{t(`services.items.${service.id}.technologyIntro`)}</p>
          </div>
          <div className="technology-list">
            {service.technologies.map((item) => (
              <span key={item}>
                <Check aria-hidden="true" size={15} />
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="section detail-benefits">
        <div className="container">
          <div className="detail-benefits__heading">
            <p className="eyebrow">{t('serviceDetail.benefitsKicker')}</p>
            <h2>{t(`services.items.${service.id}.benefitsTitle`)}</h2>
          </div>
          <div className="detail-benefits__grid">
            {service.benefits.map((item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <p>{t(item)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section detail-faq">
        <div className="container detail-faq__layout">
          <div>
            <p className="eyebrow">{t('serviceDetail.faqKicker')}</p>
            <h2>{t('serviceDetail.faqTitle')}</h2>
            <p>{t('serviceDetail.faqDescription')}</p>
            <Link className="text-link" to="/faq">
              {t('common.allQuestions')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <FaqList items={service.questions} />
        </div>
      </section>
      <section className="section related-services">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{t('serviceDetail.relatedKicker')}</p>
              <h2>{t('serviceDetail.relatedTitle')}</h2>
            </div>
            <Link className="text-link" to="/services">
              {t('common.allServices')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="related-services__grid">
            {services
              .filter((item) => service.related.includes(item.id))
              .map((item, index) => (
                <ServiceCard index={index} key={item.id} service={item} />
              ))}
          </div>
        </div>
      </section>
      <CTASection
        description={`services.items.${service.id}.ctaDescription`}
        title={`services.items.${service.id}.ctaTitle`}
      />
    </>
  );
}
