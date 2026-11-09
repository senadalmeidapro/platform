import { useTranslation } from 'react-i18next';
import { PageMeta } from '../components/PageMeta';

export function PrivacyPolicyPage() {
  return <LegalDocument page="privacy" />;
}

export function TermsPage() {
  return <LegalDocument page="terms" />;
}

export function LegalDocument({ page }: { page: 'privacy' | 'terms' }) {
  const { t } = useTranslation();
  const title = `legal.${page}.title`;
  const sections =
    page === 'privacy'
      ? ['data', 'use', 'retention', 'rights']
      : ['scope', 'requests', 'equipment', 'liability'];
  return (
    <>
      <PageMeta description={`meta.${page}.description`} title={`meta.${page}.title`} />
      <section className="page-masthead page-masthead--legal">
        <div className="container">
          <div className="page-masthead__copy">
            <p className="eyebrow">{t('legal.draftLabel')}</p>
            <h1>{t(title)}</h1>
            <p>{t(`legal.${page}.introduction`)}</p>
          </div>
        </div>
      </section>
      <section className="section legal-content">
        <div className="container legal-content__inner">
          <div className="legal-draft-notice">{t('legal.draftNotice')}</div>
          {sections.map((section) => (
            <article key={section}>
              <h2>{t(`legal.${page}.sections.${section}.title`)}</h2>
              <p>{t(`legal.${page}.sections.${section}.body`)}</p>
            </article>
          ))}
          <p className="legal-last-updated">{t('legal.lastUpdated')}</p>
        </div>
      </section>
    </>
  );
}
