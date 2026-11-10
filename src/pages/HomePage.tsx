import { ArrowRight, BadgeCheck, BriefcaseBusiness, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../components/CTASection';
import { ServiceCard } from '../components/ContentSections';
import { ImageFrame } from '../components/ImageFrame';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceIcon } from '../components/ServiceIcon';
import { t } from '../content';
import { industries, productCategories, services, workSteps } from '../data/catalog';

const strengths = [
  {
    icon: BadgeCheck,
    title: 'home.intro.strengths.expertise',
    body: 'home.intro.strengths.expertiseBody',
  },
  {
    icon: ShieldCheck,
    title: 'home.intro.strengths.reliability',
    body: 'home.intro.strengths.reliabilityBody',
  },
  {
    icon: BriefcaseBusiness,
    title: 'home.intro.strengths.fit',
    body: 'home.intro.strengths.fitBody',
  },
];

const capabilityGroups = ['systems', 'networking', 'security', 'office'] as const;

export function HomePage() {
  return (
    <>
      <PageMeta title="meta.home.title" description="meta.home.description" />

      <section className="hero">
        <div className="container hero__layout">
          <div className="hero__copy">
            <span className="badge">
              <span className="badge__dot" />
              {t('home.hero.kicker')}
            </span>
            <h1>{t('home.hero.title')}</h1>
            <p className="lead">{t('home.hero.description')}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" to="/request-quote">
                {t('nav.requestQuote')} <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="btn btn--secondary btn--lg" to="/services">
                {t('home.hero.secondary')}
              </Link>
            </div>
            <p className="hero__assurance">
              <ShieldCheck aria-hidden="true" size={18} />
              {t('home.hero.promise')}
            </p>
          </div>
          <div className="hero__visual">
            <ImageFrame
              alt={t('home.hero.imageAlt')}
              className="hero__frame"
              priority
              src={services[0]!.image}
            />
            <aside aria-label={t('home.hero.panelTitle')} className="hero__panel">
              <p className="hero__panel-title">{t('home.hero.panelTitle')}</p>
              {[services[2]!, services[3]!, services[4]!].map((service) => (
                <div className="hero__panel-row" key={service.id}>
                  <span className="icon-box">
                    <ServiceIcon name={service.icon} />
                  </span>
                  {t(`services.items.${service.id}.title`)}
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.services.title" description="home.services.description" />
            <Link className="link" to="/services">
              {t('home.services.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="grid grid--3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split">
          <ImageFrame
            alt={t('home.intro.imageAlt')}
            className="detail-hero__frame"
            src={services[2]!.image}
          />
          <div className="split__copy">
            <h2>{t('home.intro.title')}</h2>
            <p>{t('home.intro.description')}</p>
            <div className="feature-list">
              {strengths.map(({ icon: Icon, title, body }) => (
                <div className="feature" key={title}>
                  <span className="icon-box">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link className="link" to="/about">
              {t('home.intro.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <SectionHeading
              align="center"
              title="home.capabilities.title"
              description="home.capabilities.description"
            />
          </div>
          <div className="grid grid--4">
            {capabilityGroups.map((group) => (
              <article className="card capability" key={group}>
                <h3>{t(`home.capabilities.groups.${group}.title`)}</h3>
                <p>{t(`home.capabilities.groups.${group}.description`)}</p>
                <ul className="check-list">
                  {[0, 1, 2, 3].map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">·</span>
                      {t(`home.capabilities.groups.${group}.items.${item}`)}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.process.title" description="home.process.description" />
          </div>
          <ol className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {workSteps.map((step) => (
              <li className="card step" key={step}>
                <h3>{t(`home.process.steps.${step}.title`)}</h3>
                <p>{t(`home.process.steps.${step}.description`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.products.title" description="home.products.description" />
            <Link className="link" to="/products">
              {t('home.products.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="chips">
            {productCategories.map((category) => (
              <Link className="chip" key={category} to={`/products?category=${category}`}>
                {t(`products.categories.${category}`)}
              </Link>
            ))}
          </div>
          <p className="note">{t('products.demoNote')}</p>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>{t('home.industries.title')}</h2>
            <p>{t('home.industries.description')}</p>
            <div className="chips">
              {industries.map((industry) => (
                <span className="chip chip--static" key={industry}>
                  {t(`home.industries.items.${industry}`)}
                </span>
              ))}
            </div>
            <Link className="link" to="/contact">
              {t('home.industries.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <figure className="card quote">
            <blockquote>{t('home.testimonial.demoQuote')}</blockquote>
            <figcaption>
              <span className="quote__avatar">{t('home.testimonial.demoInitials')}</span>
              <span>
                <strong>{t('home.testimonial.demoName')}</strong>
                <small>{t('home.testimonial.demoRole')}</small>
              </span>
              <em className="quote__tag">{t('home.testimonial.demoLabel')}</em>
            </figcaption>
          </figure>
        </div>
      </section>

      <CTASection description="home.finalCta.description" title="home.finalCta.title" />
    </>
  );
}
