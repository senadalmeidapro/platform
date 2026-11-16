import {
  ArrowRight,
  Armchair,
  Building2,
  Cctv,
  Cpu,
  GraduationCap,
  House,
  Briefcase,
  Landmark,
  Laptop,
  Monitor,
  Mouse,
  Paperclip,
  Printer,
  Router,
  ShieldCheck,
  Store,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  PackageCheck,
  Cable,
  Headset,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Link } from 'react-router';
import { ConsoleIllustration } from '../components/ConsoleIllustration';
import { CTASection } from '../components/CTASection';
import { ServiceCard } from '../components/ContentSections';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceIcon } from '../components/ServiceIcon';
import { t } from '../content';
import { industries, productCategories, services, workSteps, type Service } from '../data/catalog';

type Icon = ComponentType<{ 'size'?: number; 'aria-hidden'?: boolean }>;

const trust: Array<{ icon: Icon }> = [
  { icon: ClipboardCheck },
  { icon: PackageCheck },
  { icon: Cable },
  { icon: Headset },
];

const industryIcons: Record<(typeof industries)[number], Icon> = {
  smallBusiness: Briefcase,
  offices: Building2,
  education: GraduationCap,
  retail: Store,
  organizations: Landmark,
  individuals: House,
};

const categoryIcons: Record<(typeof productCategories)[number], Icon> = {
  computers: Laptop,
  components: Cpu,
  displays: Monitor,
  printing: Printer,
  networking: Router,
  security: Cctv,
  accessories: Mouse,
  officeEquipment: Armchair,
  officeSupplies: Paperclip,
};

const strengths: Array<{ icon: Icon; title: string; body: string }> = [
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

const bentoSpan: Record<Service['id'], string> = {
  computerMaintenance: 'b-7',
  itSupport: 'b-5',
  networkInstallation: 'b-4',
  videoSurveillance: 'b-4',
  equipmentInstallation: 'b-4',
  equipmentSales: 'b-12',
};

const byId = (id: Service['id']) => services.find((service) => service.id === id)!;
const bentoOrder: Service['id'][] = [
  'computerMaintenance',
  'itSupport',
  'networkInstallation',
  'videoSurveillance',
  'equipmentInstallation',
];

export function HomePage() {
  const sales = byId('equipmentSales');

  return (
    <>
      <PageMeta title="meta.home.title" description="meta.home.description" />

      <section className="hero grid-bg on-dark">
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
          <ConsoleIllustration />
        </div>
      </section>

      <div className="trust-wrap">
        <div className="container">
          <div className="trust">
            {trust.map(({ icon: Icon }, index) => (
              <div className="trust__item" key={index}>
                <span className="icon-box">
                  <Icon aria-hidden size={20} />
                </span>
                <div>
                  <h3>{t(`home.trust.${index}.title`)}</h3>
                  <p>{t(`home.trust.${index}.body`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.services.title" description="home.services.description" />
            <Link className="link" to="/services">
              {t('home.services.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="bento">
            {bentoOrder.map((id) => {
              const service = byId(id);
              return (
                <div className={bentoSpan[id]} key={id} style={{ display: 'grid' }}>
                  <ServiceCard
                    service={service}
                    size={bentoSpan[id] === 'b-4' ? 'default' : 'large'}
                  />
                </div>
              );
            })}
            <article className="card service-card service-card--wide b-12">
              <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
                <span className="icon-box">
                  <ServiceIcon name={sales.icon} />
                </span>
                <h3>{t(`services.items.${sales.id}.title`)}</h3>
                <p>{t(`services.items.${sales.id}.short`)}</p>
                <Link className="link" to={`/services/${sales.slug}`}>
                  {t('common.learnMore')} <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </div>
              <div className="chips">
                {productCategories.map((category) => (
                  <span className="chip" key={category}>
                    {t(`products.categories.${category}`)}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--dark on-dark">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.process.title" description="home.process.description" />
          </div>
          <ol className="timeline">
            {workSteps.map((step, index) => (
              <li className="t-step" key={step}>
                <span className="t-step__num">0{index + 1}</span>
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
            <SectionHeading
              title="home.industries.title"
              description="home.industries.description"
            />
            <Link className="link" to="/contact">
              {t('home.industries.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="grid grid--3">
            {industries.map((industry) => {
              const Icon = industryIcons[industry];
              return (
                <div className="card audience" key={industry}>
                  <span className="icon-box">
                    <Icon aria-hidden size={20} />
                  </span>
                  <strong>{t(`home.industries.items.${industry}`)}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <SectionHeading title="home.products.title" description="home.products.description" />
            <Link className="link" to="/products">
              {t('home.products.link')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="grid grid--3">
            {productCategories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <Link className="tile-link" key={category} to={`/products?category=${category}`}>
                  <span className="icon-box">
                    <Icon aria-hidden size={20} />
                  </span>
                  {t(`products.categories.${category}`)}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              );
            })}
          </div>
          <p className="note">{t('products.demoNote')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <div className="split__copy">
            <h2>{t('home.intro.title')}</h2>
            <p>{t('home.intro.description')}</p>
            <div className="feature-list">
              {strengths.map(({ icon: Icon, title, body }) => (
                <div className="feature" key={title}>
                  <span className="icon-box">
                    <Icon aria-hidden size={20} />
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
