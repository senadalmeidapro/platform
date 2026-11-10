import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { CTASection } from '../components/CTASection';
import { CheckList, FaqList, ServiceCard } from '../components/ContentSections';
import { ImageFrame } from '../components/ImageFrame';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceIcon } from '../components/ServiceIcon';
import { t } from '../content';
import { services } from '../data/catalog';
import { NotFoundPage } from './NotFoundPage';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);
  if (!service) return <NotFoundPage />;
  const key = `services.items.${service.id}`;

  return (
    <>
      <PageMeta description={`${key}.seoDescription`} title={`${key}.seoTitle`} />

      <section className="detail-hero">
        <div className="container">
          <Breadcrumbs
            items={[{ label: 'nav.services', to: '/services' }, { label: `${key}.title` }]}
          />
          <div className="detail-hero__layout">
            <div className="detail-hero__copy">
              <span className="icon-box">
                <ServiceIcon name={service.icon} />
              </span>
              <h1>{t(`${key}.title`)}</h1>
              <p className="lead">{t(`${key}.long`)}</p>
              <Link
                className="btn btn--primary btn--lg"
                to={`/request-quote?service=${service.slug}`}
              >
                {t('nav.requestQuote')} <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
            <ImageFrame
              alt={t(`${key}.imageAlt`)}
              className="detail-hero__frame"
              priority
              src={service.image}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>{t(`${key}.scopeTitle`)}</h2>
            <p>{t(`${key}.scopeIntro`)}</p>
          </div>
          <div className="card card--list">
            <CheckList items={service.scopes} />
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>{t(`${key}.technologyTitle`)}</h2>
            <p>{t(`${key}.technologyIntro`)}</p>
          </div>
          <div className="tech-list">
            {service.technologies.map((item) => (
              <span key={item}>
                <Check aria-hidden="true" size={15} />
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionHeading title={`${key}.benefitsTitle`} />
          </div>
          <div className="grid grid--3">
            {service.benefits.map((item) => (
              <article className="card benefit" key={item}>
                <span className="icon-box">
                  <Check aria-hidden="true" size={20} />
                </span>
                <p>{t(item)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>{t('serviceDetail.faqTitle')}</h2>
            <p>{t('serviceDetail.faqDescription')}</p>
            <Link className="link" to="/faq">
              {t('common.allQuestions')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <FaqList items={service.questions} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{t('serviceDetail.relatedTitle')}</h2>
            <Link className="link" to="/services">
              {t('common.allServices')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="grid grid--3">
            {services
              .filter((item) => service.related.includes(item.id))
              .map((item) => (
                <ServiceCard key={item.id} service={item} />
              ))}
          </div>
        </div>
      </section>

      <CTASection description={`${key}.ctaDescription`} title={`${key}.ctaTitle`} />
    </>
  );
}
