import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { t } from '../content';

export function CTASection({ title, description }: { title: string; description: string }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box">
          <div>
            <h2>{t(title)}</h2>
            <p>{t(description)}</p>
          </div>
          <div className="cta__actions">
            <Link className="btn btn--on-dark btn--lg" to="/request-quote">
              {t('nav.requestQuote')} <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="link link--on-dark" to="/contact">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
