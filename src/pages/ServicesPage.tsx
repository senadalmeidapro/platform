import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../components/CTASection';
import { FaqList, ServiceCard } from '../components/ContentSections';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { t } from '../content';
import { services } from '../data/catalog';

const serviceFaqs = [0, 1, 2].map((index) => ({
  question: `services.faq.${index}.question`,
  answer: `services.faq.${index}.answer`,
}));

const groups = {
  maintenance: ['computerMaintenance', 'itSupport'],
  infrastructure: ['equipmentInstallation', 'networkInstallation', 'videoSurveillance'],
  commercial: ['equipmentSales'],
} as const;

export function ServicesPage() {
  return (
    <>
      <PageMeta description="meta.services.description" title="meta.services.title" />
      <PageHeader
        description={t('services.overview.description')}
        title={t('services.overview.title')}
        trail={[{ label: 'nav.services' }]}
      >
        <Link className="btn btn--primary" to="/request-quote">
          {t('nav.requestQuote')} <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </PageHeader>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionHeading
              title="services.directory.title"
              description="services.directory.description"
            />
          </div>
          <div className="grid grid--3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="services.groups.title" />
          </div>
          <div className="grid grid--3">
            {(Object.keys(groups) as Array<keyof typeof groups>).map((group) => (
              <article className="card capability" key={group}>
                <h3>{t(`services.groups.items.${group}.title`)}</h3>
                <p>{t(`services.groups.items.${group}.description`)}</p>
                <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
                  {services
                    .filter((service) => (groups[group] as readonly string[]).includes(service.id))
                    .map((service) => (
                      <Link className="link" key={service.id} to={`/services/${service.slug}`}>
                        {t(`services.items.${service.id}.title`)}{' '}
                        <ArrowRight aria-hidden="true" size={15} />
                      </Link>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <SectionHeading
            title="services.approach.title"
            description="services.approach.description"
          />
          <FaqList items={serviceFaqs} />
        </div>
      </section>

      <CTASection description="services.cta.description" title="services.cta.title" />
    </>
  );
}
