import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export function CTASection({
  title,
  description,
  dark = true,
}: {
  title: string;
  description: string;
  dark?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <section className={`cta-section ${dark ? 'cta-section--dark' : ''}`}>
      <div className="container cta-section__inner">
        <div>
          <p className="eyebrow">{t('common.readyToTalk')}</p>
          <h2>{t(title)}</h2>
          <p>{t(description)}</p>
        </div>
        <div className="cta-section__actions">
          <Link className="button button--white" to="/request-quote">
            {t('nav.requestQuote')} <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          <Link className={`text-link ${dark ? 'text-link--light' : ''}`} to="/contact">
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
