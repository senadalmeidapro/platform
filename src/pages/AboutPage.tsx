import { ArrowUpRight, Compass, Handshake, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { services } from '../data/catalog';
import { CTASection } from '../components/CTASection';
import { ImageFrame } from '../components/ImageFrame';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';

const values = [
  { key: 'professionalism', icon: Compass },
  { key: 'reliability', icon: Shield },
  { key: 'integrity', icon: Handshake },
  { key: 'quality', icon: Sparkles },
];

export function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageMeta description="meta.about.description" title="meta.about.title" />
      <section className="page-masthead page-masthead--about">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('about.kicker')}</p>
            <h1>{t('about.title')}</h1>
            <p>{t('about.introduction')}</p>
          </div>
          <div className="page-masthead__aside">{t('about.aside')}</div>
        </div>
      </section>
      <section className="section about-story">
        <div className="container about-story__layout">
          <div>
            <SectionHeading kicker="about.overview.kicker" title="about.overview.title" />
            <p className="body-lead">{t('about.overview.body')}</p>
            <p className="body-copy">{t('about.overview.detail')}</p>
            <Link className="text-link" to="/services">
              {t('common.exploreServices')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="about-story__visual">
            <ImageFrame
              alt={t('about.imageAlt')}
              className="about-story__image"
              src={services[1]!.image}
            />
            <span className="about-story__visual-caption">{t('about.imageCaption')}</span>
          </div>
        </div>
      </section>
      <section className="section purpose-section">
        <div className="container purpose-grid">
          <article className="purpose-panel">
            <span>01</span>
            <p className="eyebrow">{t('about.mission.kicker')}</p>
            <h2>{t('about.mission.title')}</h2>
            <p>{t('about.mission.body')}</p>
          </article>
          <article className="purpose-panel purpose-panel--light">
            <span>02</span>
            <p className="eyebrow">{t('about.vision.kicker')}</p>
            <h2>{t('about.vision.title')}</h2>
            <p>{t('about.vision.body')}</p>
          </article>
        </div>
      </section>
      <section className="section values-section">
        <div className="container">
          <SectionHeading
            align="center"
            kicker="about.values.kicker"
            title="about.values.title"
            description="about.values.description"
          />
          <div className="values-list">
            {values.map(({ key, icon: Icon }, index) => (
              <article className="value-item" key={key}>
                <span className="value-item__number">0{index + 1}</span>
                <span className="value-item__icon">
                  <Icon aria-hidden="true" size={23} />
                </span>
                <h3>{t(`about.values.items.${key}.title`)}</h3>
                <p>{t(`about.values.items.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section about-expertise">
        <div className="container about-expertise__layout">
          <SectionHeading
            kicker="about.expertise.kicker"
            title="about.expertise.title"
            description="about.expertise.description"
          />
          <div className="about-expertise__links">
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.slug}`}>
                <span>{t(`services.items.${service.id}.title`)}</span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section audience-section">
        <div className="container audience-section__inner">
          <div>
            <p className="eyebrow">{t('about.audience.kicker')}</p>
            <h2>{t('about.audience.title')}</h2>
          </div>
          <p>{t('about.audience.body')}</p>
        </div>
      </section>
      <CTASection description="about.cta.description" title="about.cta.title" />
    </>
  );
}
