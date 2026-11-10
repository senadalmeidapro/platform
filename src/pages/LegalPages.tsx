import { PageHeader } from '../components/PageHeader';
import { PageMeta } from '../components/PageMeta';
import { t } from '../content';

export function PrivacyPolicyPage() {
  return <LegalDocument page="privacy" />;
}

export function TermsPage() {
  return <LegalDocument page="terms" />;
}

export function LegalDocument({ page }: { page: 'privacy' | 'terms' }) {
  const sections =
    page === 'privacy'
      ? ['data', 'use', 'retention', 'rights']
      : ['scope', 'requests', 'equipment', 'liability'];
  return (
    <>
      <PageMeta description={`meta.${page}.description`} title={`meta.${page}.title`} />
      <PageHeader
        description={t(`legal.${page}.introduction`)}
        title={t(`legal.${page}.title`)}
        trail={[{ label: `legal.${page}.title` }]}
      />
      <section className="section">
        <div className="container prose">
          <div className="prose__notice">{t('legal.draftNotice')}</div>
          {sections.map((section) => (
            <article key={section}>
              <h2>{t(`legal.${page}.sections.${section}.title`)}</h2>
              <p>{t(`legal.${page}.sections.${section}.body`)}</p>
            </article>
          ))}
          <p className="small-print">{t('legal.lastUpdated')}</p>
        </div>
      </section>
    </>
  );
}
