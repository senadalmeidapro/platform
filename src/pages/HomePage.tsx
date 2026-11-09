import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronRight,
  MoveRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { industries, productCategories, services, workSteps } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { ImageFrame } from '../components/ImageFrame';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ContentSections';

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

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <PageMeta title="meta.home.title" description="meta.home.description" />
      <section className="home-hero">
        <div className="home-hero__grid" />
        <div className="container home-hero__layout">
          <div className="home-hero__content">
            <p className="hero-kicker">
              <span />
              {t('home.hero.kicker')}
            </p>
            <h1>{t('home.hero.title')}</h1>
            <p className="home-hero__lead">{t('home.hero.description')}</p>
            <div className="home-hero__actions">
              <Link className="button button--primary button--large" to="/request-quote">
                {t('nav.requestQuote')}
                <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <Link className="button button--outline button--large" to="/services">
                {t('home.hero.secondary')}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
            <div className="home-hero__promise">
              <ShieldCheck aria-hidden="true" size={17} />
              <span>{t('home.hero.promise')}</span>
            </div>
          </div>
          <div className="home-hero__visual">
            <ImageFrame
              alt={t('home.hero.imageAlt')}
              className="home-hero__photo"
              imageClassName="home-hero__photo-image"
              priority
              src={services[0]!.image}
            />
            <div aria-hidden="true" className="home-hero__photo-shade" />
            <div className="hero-caption">
              <span className="hero-caption__dot" />
              <span>{t('home.hero.imageCaption')}</span>
            </div>
            <div className="hero-side-note">
              <span>{t('home.hero.sideNoteTop')}</span>
              <strong>{t('home.hero.sideNoteBottom')}</strong>
            </div>
            <div className="hero-stamp">
              <Sparkles aria-hidden="true" size={18} />
              <span>{t('home.hero.stamp')}</span>
            </div>
          </div>
        </div>
        <div className="container home-hero__foot">
          <span>{t('home.hero.footnote')}</span>
          <span className="home-hero__foot-line" />
          <span>{t('home.hero.footnoteRight')}</span>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-layout">
          <div className="intro-visual">
            <ImageFrame
              alt={t('home.intro.imageAlt')}
              className="intro-visual__image"
              src={services[2]!.image}
            />
            <div className="intro-visual__label">
              <span>01</span>
              <p>{t('home.intro.imageNote')}</p>
            </div>
            <div className="intro-visual__line" />
          </div>
          <div className="intro-copy">
            <p className="eyebrow">{t('home.intro.kicker')}</p>
            <h2>{t('home.intro.title')}</h2>
            <p className="intro-copy__lead">{t('home.intro.description')}</p>
            <Link className="text-link" to="/about">
              {t('home.intro.link')}
              <MoveRight aria-hidden="true" size={18} />
            </Link>
            <div className="strength-list">
              {strengths.map(({ icon: Icon, title, body }) => (
                <div className="strength-item" key={title}>
                  <span>
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              kicker="home.services.kicker"
              title="home.services.title"
              description="home.services.description"
            />
            <Link className="text-link text-link--light section-heading-row__link" to="/services">
              {t('home.services.link')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="services-showcase">
            {services.map((service, index) => (
              <ServiceCard
                featured={index === 0 || index === 4}
                index={index}
                key={service.id}
                service={service}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section capability-section">
        <div className="container">
          <SectionHeading
            align="center"
            kicker="home.capabilities.kicker"
            title="home.capabilities.title"
            description="home.capabilities.description"
          />
          <div className="capability-grid">
            {(['systems', 'networking', 'security', 'office'] as const).map((group, index) => (
              <article className={`capability-item capability-item--${group}`} key={group}>
                <span className="capability-item__index">0{index + 1}</span>
                <h3>{t(`home.capabilities.groups.${group}.title`)}</h3>
                <p>{t(`home.capabilities.groups.${group}.description`)}</p>
                <span className="capability-item__rule" />
                <ul>
                  {[0, 1, 2, 3].map((item) => (
                    <li key={item}>{t(`home.capabilities.groups.${group}.items.${item}`)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section products-preview">
        <div className="container">
          <div className="section-heading-row section-heading-row--products">
            <SectionHeading
              kicker="home.products.kicker"
              title="home.products.title"
              description="home.products.description"
            />
            <Link className="text-link" to="/products">
              {t('home.products.link')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="category-strip">
            {productCategories.slice(0, 6).map((category, index) => (
              <Link
                className={`category-tile category-tile--${index + 1}`}
                key={category}
                to={`/products?category=${category}`}
              >
                <span className="category-tile__index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{t(`products.categories.${category}`)}</h3>
                <span className="category-tile__arrow">
                  <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              </Link>
            ))}
          </div>
          <p className="demo-note">
            <span />
            {t('products.demoNote')}
          </p>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="process-heading">
            <SectionHeading
              kicker="home.process.kicker"
              title="home.process.title"
              description="home.process.description"
            />
            <p className="process-heading__aside">{t('home.process.aside')}</p>
          </div>
          <div className="process-steps">
            {workSteps.map((step, index) => (
              <article className="process-step" key={step}>
                <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden="true" className="process-step__node">
                  <span />
                </span>
                <h3>{t(`home.process.steps.${step}.title`)}</h3>
                <p>{t(`home.process.steps.${step}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section industries-section">
        <div className="container industries-layout">
          <div className="industries-intro">
            <SectionHeading
              kicker="home.industries.kicker"
              title="home.industries.title"
              description="home.industries.description"
            />
            <Link className="text-link" to="/contact">
              {t('home.industries.link')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="industries-list">
            {industries.map((industry, index) => (
              <div className="industry-row" key={industry}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{t(`home.industries.items.${industry}`)}</h3>
                <ChevronRight aria-hidden="true" size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonial-section">
        <div className="container testimonial-layout">
          <div className="testimonial-intro">
            <p className="eyebrow">{t('home.testimonial.kicker')}</p>
            <h2>{t('home.testimonial.title')}</h2>
            <p>{t('home.testimonial.description')}</p>
          </div>
          <figure className="testimonial-quote">
            <span aria-hidden="true" className="quote-mark">
              “
            </span>
            <blockquote>{t('home.testimonial.demoQuote')}</blockquote>
            <figcaption>
              <span className="testimonial-avatar">{t('home.testimonial.demoInitials')}</span>
              <span>
                <strong>{t('home.testimonial.demoName')}</strong>
                <small>{t('home.testimonial.demoRole')}</small>
              </span>
              <em>{t('home.testimonial.demoLabel')}</em>
            </figcaption>
          </figure>
        </div>
      </section>

      <CTASection description="home.finalCta.description" title="home.finalCta.title" />
    </>
  );
}
