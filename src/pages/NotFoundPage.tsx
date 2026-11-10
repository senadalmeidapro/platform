import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { PageMeta } from '../components/PageMeta';
import { t } from '../content';

export function NotFoundPage() {
  return (
    <>
      <PageMeta description="meta.notFound.description" title="meta.notFound.title" />
      <section className="not-found">
        <div className="container not-found__inner">
          <span aria-hidden="true" className="not-found__code">
            404
          </span>
          <h1>{t('notFound.title')}</h1>
          <p className="lead">{t('notFound.description')}</p>
          <div className="not-found__actions">
            <Link className="btn btn--primary" to="/">
              <ArrowLeft aria-hidden="true" size={17} />
              {t('notFound.home')}
            </Link>
            <Link className="link" to="/contact">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
