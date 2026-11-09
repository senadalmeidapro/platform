import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PageMeta } from '../components/PageMeta';

export function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageMeta description="meta.notFound.description" title="meta.notFound.title" />
      <section className="not-found">
        <div className="not-found__grid" />
        <div className="container not-found__inner">
          <span>404</span>
          <p className="eyebrow">{t('notFound.kicker')}</p>
          <h1>{t('notFound.title')}</h1>
          <p>{t('notFound.description')}</p>
          <div>
            <Link className="button button--primary" to="/">
              <ArrowLeft size={17} />
              {t('notFound.home')}
            </Link>
            <Link className="text-link" to="/contact">
              {t('nav.contact')}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
