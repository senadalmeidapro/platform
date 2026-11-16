import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { t } from '../content';

export function CTASection({
  title,
  description,
  literal = false,
}: {
  title: string;
  description: string;
  literal?: boolean;
}) {
  const text = (value: string) => (literal ? value : t(value));
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__box on-dark">
          <div>
            <h2>{text(title)}</h2>
            <p>{text(description)}</p>
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
