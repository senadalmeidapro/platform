import { ArrowRight, Compass, Handshake, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { CTASection } from '../components/CTASection';
import { ImageFrame } from '../components/ImageFrame';
import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { SectionHeading } from '../components/SectionHeading';
import { t } from '../content';
import { services } from '../data/catalog';

const values = [
  { key: 'professionalism', icon: Compass },
  { key: 'reliability', icon: Shield },
  { key: 'integrity', icon: Handshake },
  { key: 'quality', icon: Sparkles },
];

export function AboutPage() {
  return (
    <>
      <PageMeta description="meta.about.description" title="meta.about.title" />
      <PageHeader
        description={t('about.introduction')}
        title={t('about.title')}
        trail={[{ label: 'nav.about' }]}
      />

      <section className="section">
        <div className="container split">
          <div className="split__copy">
            <h2>{t('about.overview.title')}</h2>
            <p>{t('about.overview.body')}</p>
            <p>{t('about.overview.detail')}</p>
            <Link className="link" to="/services">
              {t('common.exploreServices')} <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ImageFrame
            alt={t('about.imageAlt')}
            className="detail-hero__frame"
            src={services[1]!.image}
          />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container grid grid--2">
          {(['mission', 'vision'] as const).map((key) => (
            <article className="card card--list" key={key} style={{ display: 'grid', gap: 12 }}>
              <h2 style={{ fontSize: '1.5rem' }}>{t(`about.${key}.title`)}</h2>
              <p>{t(`about.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <SectionHeading
              align="center"
              title="about.values.title"
              description="about.values.description"
            />
          </div>
          <div className="grid grid--4">
            {values.map(({ key, icon: Icon }) => (
              <article className="card capability" key={key}>
                <span className="icon-box">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3>{t(`about.values.items.${key}.title`)}</h3>
                <p>{t(`about.values.items.${key}.description`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container split split--top">
          <SectionHeading title="about.expertise.title" description="about.expertise.description" />
          <div className="chips">
            {services.map((service) => (
              <Link className="chip" key={service.id} to={`/services/${service.slug}`}>
                {t(`services.items.${service.id}.title`)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--top">
          <h2>{t('about.audience.title')}</h2>
          <p style={{ fontSize: '1.075rem', color: 'var(--muted)' }}>{t('about.audience.body')}</p>
        </div>
      </section>

      <CTASection description="about.cta.description" title="about.cta.title" />
    </>
  );
}
