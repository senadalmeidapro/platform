import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { services } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { FaqList, ServiceCard } from '../components/ContentSections';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';

export function ServicesPage() {
  const { t } = useTranslation();
  const serviceFaqs = [
    { question: 'services.faq.0.question', answer: 'services.faq.0.answer' },
    { question: 'services.faq.1.question', answer: 'services.faq.1.answer' },
    { question: 'services.faq.2.question', answer: 'services.faq.2.answer' },
  ];

  return (
    <>
      <PageMeta description="meta.services.description" title="meta.services.title" />
      <section className="page-masthead page-masthead--services">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('services.overview.kicker')}</p>
            <h1>{t('services.overview.title')}</h1>
            <p>{t('services.overview.description')}</p>
          </div>
          <Link className="masthead-link" to="/request-quote">
            {t('nav.requestQuote')}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section service-directory">
        <div className="container">
          <SectionHeading
            kicker="services.directory.kicker"
            title="services.directory.title"
            description="services.directory.description"
          />
          <div className="service-directory__grid">
            {services.map((service, index) => (
              <ServiceCard
                featured={index === 0 || index === 3}
                index={index}
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section service-groups">
        <div className="container">
          <SectionHeading kicker="services.groups.kicker" title="services.groups.title" />
          <div className="service-groups__grid">
            {(['maintenance', 'infrastructure', 'commercial'] as const).map((group, index) => (
              <article className="service-group" key={group}>
                <span>0{index + 1}</span>
                <h3>{t(`services.groups.items.${group}.title`)}</h3>
                <p>{t(`services.groups.items.${group}.description`)}</p>
                <div>
                  {services
                    .filter((service) =>
                      group === 'maintenance'
                        ? ['computerMaintenance', 'itSupport'].includes(service.id)
                        : group === 'infrastructure'
                          ? [
                              'equipmentInstallation',
                              'networkInstallation',
                              'videoSurveillance',
                            ].includes(service.id)
                          : service.id === 'equipmentSales',
                    )
                    .map((service) => (
                      <Link key={service.id} to={`/services/${service.slug}`}>
                        {t(`services.items.${service.id}.title`)}
                        <ArrowUpRight size={15} />
                      </Link>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section services-process">
        <div className="container services-process__layout">
          <div>
            <SectionHeading
              kicker="services.approach.kicker"
              title="services.approach.title"
              description="services.approach.description"
            />
          </div>
          <FaqList items={serviceFaqs} />
        </div>
      </section>
      <CTASection description="services.cta.description" title="services.cta.title" />
    </>
  );
}
